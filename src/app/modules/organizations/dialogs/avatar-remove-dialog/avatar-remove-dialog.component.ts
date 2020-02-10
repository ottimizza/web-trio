
import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { InvitationService } from '@app/http/invites.service';
import { OrganizationService } from '@app/http/organizations.service';
import { GenericResponse } from '@shared/models/GenericResponse';

export interface AlertFeedback {
  visible: boolean;
  classes?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-avatar-remove-dialog',
  templateUrl: './avatar-remove-dialog.component.html',
})
export class AvatarRemoveDialogComponent {



  constructor(
    public organizationService: OrganizationService,
    public dialogRef: MatDialogRef<AvatarRemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public close(result: boolean) {
    this.dialogRef.close(result);
  }

  onNoClick(): void {
    this.close(false);
  }

}
