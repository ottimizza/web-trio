
import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageCropperComponent } from '@shared/components/image-cropper/component/image-cropper.component';
import { ImageCroppedEvent } from '@shared/components/image-cropper/interfaces';

@Component({
  selector: 'app-organization-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent {

  public imageChangedEvent: any = '';

  public croppedImage: any = '';
  public showCropper = false;

  @ViewChild(ImageCropperComponent, { static: false })
  imageCropper: ImageCropperComponent;

  constructor(public dialogRef: MatDialogRef<AvatarDialogComponent>) { }

  // User Uploads an Image.
  public fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // Cropper Events
  onImageCropped(event: ImageCroppedEvent): void { this.croppedImage = event.base64; }
  onImageLoaded(): void { this.showCropper = true; }
  onCropperReady(): void { }
  loadImageFailed(): void { }

  // User Clicks Save Button
  crop(): void {
    this.dialogRef.close({
      croppedImage: this.croppedImage,
      croppedName: this.imageChangedEvent.target.files[0].name
    });
  }

  public close() {
    this.dialogRef.close();
  }

}
