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

  public user: User = new User();

  public editingId: string;

  public breadcrumb: BreadCrumb;

  public canEdit: boolean;


  constructor(private activatedRoute: ActivatedRoute,
    public router: Router,
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.croppedImage) {
        this.imageCompressorService.compress(ImageUtils.dataURLtoFile(result.croppedImage, result.croppedName))
          .subscribe((compressed) => {
            this.fileStorageService.store(compressed)
              .subscribe((response) => {
                if (response.record && response.record.id) {
                  this.patch(this.user.id, {
                    avatar: this.fileStorageService.getResourceURL(response.record.id)
                  });
                }
              });
          });
      }
    });
  }

  public edit = (id: string = null) => this.editingId = id;
  public isEditing = (id: string) => this.editingId === id;

  public fetchById(id: number): void {
    this.userService.fetchById(id).pipe(
      finalize(() => {
        this.canEdit = this.currentUser.username === this.user.username;
        this.breadcrumb = {
          label: `${this.user.firstName} ${this.user.lastName}`,
          params: {},
          url: this.router.url
        };
      })
    ).subscribe((response: GenericResponse<User>) => {
      this.user = response.record;
    });
  }

  public patch(id: number, data: any): void {
    this.userService.patch(id, data).pipe(
      finalize(() => {
        this.breadcrumb = {
          label: `${this.user.firstName} ${this.user.lastName}`,
          params: {},
          url: this.router.url
        };
        this.edit();
      })
    ).subscribe((response: GenericResponse<User>) => {
      this.user = response.record;
    });
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.activatedRoute.params.subscribe((params: any) => {
      this.fetchById(params.id);
    });
  }

}
