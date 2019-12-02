import { Component, Input, OnInit } from '@angular/core';
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

  public currentTab: 'general' | 'security' = 'general';

  public user: User = new User();

  constructor(private activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
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
      label: `${user.firstName} ${user.lastName}`,
      params: {},
      url: this.router.url
    };
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.activatedRoute.params.subscribe((params: any) => {
      this.fetchById(params.id);
    });
  }

}
