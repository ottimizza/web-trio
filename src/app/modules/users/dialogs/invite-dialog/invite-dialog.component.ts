
import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { InvitationService } from '@app/http/invites.service';
import { finalize, debounceTime, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { OrganizationService } from '@app/http/organizations.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Invitation } from '@shared/models/Invitation';
import { ToastService } from '@app/services/toast.service';

export interface AlertFeedback {
  visible: boolean;
  classes?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
})
export class InviteDialogComponent implements OnInit, AfterViewInit {

  public currentUser: User;

  public alertFeedback: AlertFeedback = { visible: false };

  public invitationForm: FormGroup;

  public organizationsOptions: Array<Organization> = new Array<Organization>();
  public organizations: Array<Organization> = new Array<Organization>();

  displayedColumns: string[] = ['name', 'cnpj'];
  dataSource: MatTableDataSource<Organization>;

  isFetching: boolean;

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    public invitationService: InvitationService,
    public organizationService: OrganizationService,
    public toastService: ToastService,
    public dialogRef: MatDialogRef<InviteDialogComponent>
  ) { }

  public fetchOrganizationByName(name: string) {
    this.isFetching = true;
    this.organizationService.fetch({ name: name.toUpperCase(), pageIndex: 0, pageSize: 5 })
      .pipe(finalize(() => this.isFetching = false))
      .subscribe((response: any) => {
        this.organizationsOptions = response.records;
      });
  }

  public appendOrganization(organization: Organization): void {
    this.organizationsOptions = new Array<Organization>();
    this.organizations.push(organization);
    this.dataSource = new MatTableDataSource<Organization>(this.organizations);
  }

  public removeOrganization(organization: Organization) {
    const index = this.organizations.indexOf(organization);
    this.organizations.splice(index, index + 1);
    this.dataSource = new MatTableDataSource<Organization>(this.organizations);
  }

  public invite(): void {
    const type = this.invitationForm.get('type').value;
    const email = this.invitationForm.get('email').value;
    const organization = this.organizations[0] || this.currentUser.organization;

    const invitation = Invitation.builder()
    .email(email)
    .type(type)
    .organization(organization).build();
    if (email) {
      this.invitationService.invite(invitation).subscribe((response) => {
        if (response.record) {
          // this.alertFeedback = {
          //   visible: true, classes: 'alert alert-success',
          //   message: `Convite enviado para ${email}!`
          // };
          this.toastService.show(`Convite enviado para ${email}!`, 'success');
          this.dialogRef.close();
        }
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  public showOrganizationsFields(): boolean {
    return `${this.invitationForm.get('type').value}` === `${User.Type.CUSTOMER}`;
  }

  private applyDebouce(formGroup: FormGroup, formControlName: string, delay: number = 300) {
    return formGroup.get(formControlName).valueChanges
      .pipe(debounceTime(delay));
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();

    this.invitationForm = this.formBuilder.group({
      type: [this.currentUser.type === User.Type.ADMINISTRATOR ? User.Type.ADMINISTRATOR : User.Type.ACCOUNTANT],
      email: [''],
      organization: ['']
    });

    this.applyDebouce(this.invitationForm, 'organization').subscribe((value) => {
      if (value) {
        this.fetchOrganizationByName(value);
      }
    });
  }

  ngAfterViewInit() { }

}
