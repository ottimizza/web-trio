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
import { LoggerUtils } from '@shared/utils/logger.utils';
import { UserProductAuthorities } from '@shared/models/UserProductAuthorities';
import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { environment } from '@env';

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
export class InviteDialogComponent implements OnInit {

  public currentUser: User;

  public alertFeedback: AlertFeedback = { visible: false };

  public invitationForm: FormGroup;

  public organizationsOptions: Array<Organization> = new Array<Organization>();
  public organizations: Array<Organization> = new Array<Organization>();

  public products: Array<{ id: number, name: string }> = [];
  public productIsSelected: boolean[] = [];

  public permissions = [true, true, false];

  displayedColumns: string[] = ['name', 'cnpj'];
  dataSource: MatTableDataSource<Organization>;

  isFetching: boolean;

  private REPEATED_EMAIL_INVITE_MESSAGE = 'Email nao valido convite';
  private REPEATED_EMAIL_USER_MESSAGE = 'Email nao valido usuario';

  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    public invitationService: InvitationService,
    public organizationService: OrganizationService,
    public userProductAuthoritiesService: UserProductAuthoritiesService,
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
    const organization = (+type) !== User.Type.CUSTOMER ? this.currentUser.organization : this.organizations[0];
    const products = this.products.filter((prod, index) => this.productIsSelected[index]).map(prod => prod.id).join(';');
    let authorities = '';
    if (this.permissions[0]) { authorities += 'READ;'; }
    if (this.permissions[1]) { authorities += 'WRITE;'; }
    if (this.permissions[2]) { authorities += 'ADMIN'; }

    if (!organization || !organization.id) {
      this.toastService.show('Empresa não encontrada, tente novamente', 'warning');
      return;
    }

    this.organizationService.fetchById(organization.id).subscribe(results => {

      if (type === User.Type.CUSTOMER && (!results || !results.record || JSON.stringify(results.record) === '{}')) {
        this.toastService.show('Empresa não encontrada, tente novamente', 'warning');
        return;
      }


      const invitation = Invitation.builder()
      .email(email)
      .type(type)
      .products(products)
      .authorities(authorities)
      .organization(organization).build();
      if (email) {
        this.invitationService.invite(invitation).subscribe((response) => {
          if (response.record) {
            this.toastService.show(`Convite enviado para ${email}!`, 'success');
            this.dialogRef.close();
          }
        }, err => {
          if (err.error.error_description === this.REPEATED_EMAIL_INVITE_MESSAGE) {
            this.toastService.show('Já há um convite com este e-mail', 'danger');
          } else if (err.error.error_description === this.REPEATED_EMAIL_USER_MESSAGE) {
            this.toastService.show('Já há um usuário com este e-mail', 'danger');
          } else {
            this.toastService.show('Falha ao criar convite!', 'danger');
            LoggerUtils.throw(err);
          }
        });
      }

    });
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
    this.userProductAuthoritiesService.getProducts(environment.applicationId).subscribe(result => {
      this.products = result;
      this.productIsSelected = this.products.map(() => false);
    });

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

}
