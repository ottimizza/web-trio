
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
  selector: 'app-confirm-organization-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  title: string;
  message: string;

  confirmLabel: string;
  cancelLabel: string;

  constructor(
    public organizationService: OrganizationService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {    
    this.title = data.title;
    this.message = data.message;
    this.confirmLabel = data.confirmLabel;
    this.cancelLabel = data.cancelLabel;
  }

  public close(result: boolean) {
    this.dialogRef.close(result);
  }

  onNoClick(): void {
    this.close(false);
  }

}
