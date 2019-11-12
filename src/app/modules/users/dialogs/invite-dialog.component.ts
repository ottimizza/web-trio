
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Organization } from '@shared/models/Organization';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
})
export class InviteDialogComponent implements OnInit {

  public email: string;

  public type: number;

  public organization: Organization;

  constructor(public authenticationService: AuthenticationService,
              public dialogRef: MatDialogRef<InviteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  public invite(email: string = this.email): void {

  }

  onNoClick(): void {
    this.close();
  }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() { }

}
