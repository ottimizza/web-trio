import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { StorageService } from '@app/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '@modules/users/dialogs/invite-dialog/invite-dialog.component';
import { MatSort } from '@angular/material/sort';
import { USERLIST_TOUR } from '../../tutorial/userlist.tutorial';
import { INVITATION_TUTORIAL } from '@modules/users/tutorial/invitations.tutorial';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public currentUser: User = new User();

  public currentTab: 'userlist' | 'invitations' = 'userlist';


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public users: Array<User>;
  public pageInfo: PageInfo = new PageInfo();
  public sortInfo: any = null;

  displayedColumns: string[] = ['avatar', 'fullname', 'username', 'type'];

  constructor(public storageService: StorageService, public userService: UserService, public dialog: MatDialog) {
  }

  public openInviteDialog() {
    const dialog = this.dialog.open(InviteDialogComponent, { data: { name: '' } });
  }

  public tutorial() {
    return this.currentTab === 'userlist' ? USERLIST_TOUR : INVITATION_TUTORIAL;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  /* ************************************************************ **
   * Validations
   * ************************************************************ */
  public canInviteUser(user: User = this.currentUser): boolean {
    const allowedRoles: number[] = [
      User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT
    ];
    return allowedRoles.includes(user.type);
  }

  public fetchCurrentUser() {
    this.storageService.onStorage(AuthenticationService.STORAGE_KEY_USERINFO, (result: any) => {
      this.currentUser = User.fromLocalStorage();
    });
    this.currentUser = User.fromLocalStorage();
  }

  public ngOnInit() {
    this.fetchCurrentUser();
  }

}
