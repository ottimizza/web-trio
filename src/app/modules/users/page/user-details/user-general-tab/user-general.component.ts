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

@Component({
  selector: 'app-user-general',
  templateUrl: './user-general.component.html',
  styleUrls: ['./user-general.component.scss']
})
export class UserGeneralComponent implements OnInit {

  private currentUser: User;

  @Input()
  public user: User = null;

  @Output()
  public userUpdate: EventEmitter<any> = new EventEmitter();

  public editingId: string;

  constructor(
    public userService: UserService,
    public fileStorageService: FileStorageService,
    public imageCompressorService: ImageCompressorService,
    public dialog: MatDialog
  ) { }
  public canEdit() {
    if (this.currentUser != null && this.user != null) {
      return this.currentUser.id === this.user.id;
    }
    return false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      maxWidth: '568px',
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

  public async patch(id: number, data: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.userService.patch(id, data).pipe(
        finalize(() => {
          resolve();
        })
      ).subscribe((response: GenericResponse<User>) => {
        this.user = response.record;
      });
    }).then(() => {
      this.edit();
      this.userUpdate.emit(this.user);
    });
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

}
