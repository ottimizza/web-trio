import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FileStorageService } from '@app/http/file-storage.service';
import { ImageCompressorService } from '@app/services/image-compression.service';

interface BreadCrumb {
  label: string;
  params?: Params;
  url: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  private currentUser: User;

  public breadcrumb: BreadCrumb;

  public currentTab: 'general' | 'security' | 'organizations' | 'extra' = 'general';

  public user: User = new User();

  public rolesAndDepartments: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
  }

  canSeeTabs(): boolean {
    return (this.currentUser && this.user) ? this.currentUser.id === this.user.id : false;
  }

  isCustomer(): boolean {
    return this.user.type === User.Type.CUSTOMER;
  }

  public fetchById(id: number): void {
    this.userService.fetchById(id).pipe(
      finalize(() => {
        // this.canEdit = this.currentUser.username === this.user.username;
        this.buildBreadcrumb(this.user);
      })
    ).subscribe((response: GenericResponse<User>) => {
      this.user = response.record;
    });
  }

  onUserUpdate(event: any): void {
    this.user = event;
    this.buildBreadcrumb(this.user);
  }

  buildBreadcrumb(user: User) {
    this.breadcrumb = {
      label: `${user.firstName || ''} ${user.lastName || ''}`,
      params: {},
      url: this.router.url
    };
  }

  public missingInformations() {
    const ai = User.fromLocalStorage().additionalInformation;
    if (ai && ai.accountingDepartment && ai.birthDate && ai.role) {
      this.missingInformations = () => false;
      return false;
    }
    return true;
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.activatedRoute.params.subscribe((params: any) => {
      this.fetchById(params.id);
    });

    this.userService.fetchInformations().subscribe(result => {
      this.rolesAndDepartments = result.record;
      if (this.missingInformations()) {
        this.currentTab = 'extra';
      }
    });
  }

}
