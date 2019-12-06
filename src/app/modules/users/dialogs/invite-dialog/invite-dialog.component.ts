
import { Component, OnInit, Inject, Input, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Organization } from '@shared/models/Organization';
import { User } from '@shared/models/User';
import { InvitationService } from '@app/http/invites.service';
import { finalize } from 'rxjs/operators';

export interface AlertFeedback {
  visible: boolean;
  classes?: string;
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
})
export class InviteDialogComponent implements OnInit {

  public currentUser: User;

  @ViewChild('emailInput', { static: false })
  public emailInput: ElementRef;

  public alertFeedback: AlertFeedback = { visible: false };

  public email: string;

  public type: number;

  public organization: Organization;

  constructor(
    public invitationService: InvitationService,
    public dialogRef: MatDialogRef<InviteDialogComponent>
  ) { }

  public invite(): void {
    if (this.email !== '') {
      this.invitationService.invite({
        type: +this.type, email: this.email
      }).pipe(
        finalize(() => this.initFields())
      ).subscribe((response) => {
        if (response.record) {
          this.alertFeedback = {
            visible: true, classes: 'alert alert-success',
            message: `Convite enviado para ${this.email}!`
          };
        }
      });
    }
  }

  public close() {
    this.dialogRef.close();
  }

  private initFields(): void {
    this.email = '';
    this.type = User.Type.ACCOUNTANT;
  }

  ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.initFields();
  }

}
