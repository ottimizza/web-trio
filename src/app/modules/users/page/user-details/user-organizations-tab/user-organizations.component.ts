import { Component, Input, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from '@modules/users/dialogs/avatar-dialog/avatar-dialog.component';
import { FileStorageService } from '@app/http/file-storage.service';
import { ImageUtils } from '@shared/utils/image.utils';
import { ImageCompressorService } from '@app/services/image-compression.service';

// Forms
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Organization } from '@shared/models/Organization';

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

  //
  public organizations: Array<Organization>;

  displayedColumns: string[] = ['name', 'cnpj'];
  dataSource = this.organizations;


  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
  }

  public fetchOrganizations() {
    this.userService.fetchOrganizations(this.user.id, {})
      .subscribe((response: GenericPageableResponse<Organization>) => {
        this.organizations = response.records;
        this.dataSource = this.organizations;
      });
  }

  public openOrganizationDetailsPage(organization: Organization): void {
    this.router.navigateByUrl(`/${organization.id}`);
  }


  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.user = this.user === null ? User.fromLocalStorage() : this.user;
    this.fetchOrganizations();
  }

  ngAfterViewInit() {
    // alert('ngAfterViewInit');
  }

}
