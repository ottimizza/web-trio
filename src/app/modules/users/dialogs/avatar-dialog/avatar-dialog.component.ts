
import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { InvitationService } from '@app/http/invites.service';
import { UserService } from '@app/http/users.service';
import { ImageCropperComponent } from '@shared/components/image-cropper/component/image-cropper.component';
import { ImageCroppedEvent } from '@shared/components/image-cropper/interfaces';

export interface AlertFeedback {
  visible: boolean;
  classes?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-user-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  public currentUser: User;

  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;

  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;

  constructor(public userService: UserService,
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    // console.log(event);
  }
  imageLoaded() {
    this.showCropper = true;
    // console.log('Image loaded');
  }
  cropperReady() {
    // console.log('Cropper ready');
  }
  loadImageFailed() {
    // console.log('Load failed');
  }
  rotateLeft() {
    this.imageCropper.rotateLeft();
  }
  rotateRight() {
    this.imageCropper.rotateRight();
  }
  flipHorizontal() {
    this.imageCropper.flipHorizontal();
  }
  flipVertical() {
    this.imageCropper.flipVertical();
  }

  crop() {
    this.dialogRef.close({ croppedImage: this.croppedImage, croppedName: this.imageChangedEvent.target.files[0].name });
  }

  onNoClick(): void {
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
  }

}
