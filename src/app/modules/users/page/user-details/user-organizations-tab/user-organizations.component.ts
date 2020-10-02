import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize, debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from '@modules/users/dialogs/avatar-dialog/avatar-dialog.component';
import { FileStorageService } from '@app/http/file-storage.service';
import { ImageUtils } from '@shared/utils/image.utils';
import { ImageCompressorService } from '@app/services/image-compression.service';

// Forms
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '@shared/models/Organization';
import { OrganizationService } from '@app/http/organizations.service';

@Component({
  selector: 'app-user-organizations',
  templateUrl: './user-organizations.component.html',
  styleUrls: ['./user-organizations.component.scss']
})
export class UserOrganizationsComponent implements OnInit, AfterViewInit {

  private currentUser: User;

  @Input()
  public user: User = null;

  @Output()
  userUpdate: EventEmitter<any> = new EventEmitter();


  public form: FormGroup;

  isFetching: boolean;
  organizationsOptions = new Array<Organization>();


  //
  public organizations: Array<Organization>;

  displayedColumns: string[] = ['name', 'cnpj'];


  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public organizationService: OrganizationService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
  }

  public fetchOrganizations() {
    this.userService.fetchOrganizations(this.user.id, {})
      .subscribe((response: GenericPageableResponse<Organization>) => {
        this.organizations = response.records;
      });
  }

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
    this.userService.appendOrganization(this.user.id, organization).subscribe(() => {
      this.fetchOrganizations();
    });
  }

  public removeOrganization(organization: Organization): void {
    this.userService.removeOrganization(this.user.id, organization.id).subscribe(() => {
      this.fetchOrganizations();
    });
  }

  // public removeOrganization(organization: Organization) {
  //   const index = this.organizations.indexOf(organization);
  //   this.organizations.splice(index, index + 1);
  //   this.dataSource = new MatTableDataSource<Organization>(this.organizations);
  // }

  public openOrganizationDetailsPage(organization: Organization): void {
    this.router.navigateByUrl(`/${organization.id}`);
  }

  private applyDebouce(formGroup: FormGroup, formControlName: string, delay: number = 300) {
    return formGroup.get(formControlName).valueChanges
      .pipe(debounceTime(delay));
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.user = this.user === null ? User.fromLocalStorage() : this.user;
    this.fetchOrganizations();

    this.form = this.formBuilder.group({
      organization: ['']
    });

    this.applyDebouce(this.form, 'organization').subscribe((value) => {
      if (value) {
        this.fetchOrganizationByName(value);
      }
    });
  }

  ngAfterViewInit() {
    // alert('ngAfterViewInit');
  }

}
