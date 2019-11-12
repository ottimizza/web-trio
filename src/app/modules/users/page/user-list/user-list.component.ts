import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { StorageService } from '@app/services/storage.service';
import { ModalComponent } from '@shared/components/modals/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '@modules/users/dialogs/invite-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public currentUser: User = new User();

  public users: Array<User>;

  displayedColumns: string[] = ['avatar', 'fullname', 'username', 'type'];
  dataSource = this.users;

  constructor(public storageService: StorageService, public userService: UserService, public dialog: MatDialog) {
  }

  public fetch() {
    this.userService.fetch().subscribe((response: GenericPageableResponse<User>) => {
      this.users = response.records;
      this.dataSource = this.users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {
      data: { name: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public canInvite = () => [User.Type.ACCOUNTANT].includes(this.currentUser.type);

  public fetchCurrentUser() {
    this.storageService.onStorage(AuthenticationService.STORAGE_KEY_USERINFO, (result: any) => {
      this.currentUser = User.fromLocalStorage();
    });
    this.currentUser = User.fromLocalStorage();
  }

  showDialog() {
    let modal_t = document.getElementById('modal_1')
    modal_t.classList.remove('hhidden')
    modal_t.classList.add('sshow');
  }
  closeDialog() {
    let modal_t = document.getElementById('modal_1')
    modal_t.classList.remove('sshow')
    modal_t.classList.add('hhidden');
  }

  public ngOnInit() {
    this.fetch();

    this.fetchCurrentUser();
  }

}
