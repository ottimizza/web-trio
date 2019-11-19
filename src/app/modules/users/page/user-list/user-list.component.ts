import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { StorageService } from '@app/services/storage.service';
import { ModalComponent } from '@shared/components/modals/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '@modules/users/dialogs/invite-dialog.component';
import { Sort, MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  public currentUser: User = new User();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public users: Array<User>;
  public pageInfo: PageInfo = new PageInfo();

  displayedColumns: string[] = ['avatar', 'fullname', 'username', 'type'];
  dataSource = this.users;

  constructor(public storageService: StorageService, public userService: UserService, public dialog: MatDialog) {
  }

  public fetch(pageIndex: number = 0, pageSize: number = 10, sort: Sort = null) {

    let searchCriteria = { pageIndex, pageSize };
    if (sort && sort.active && sort.direction) {
      searchCriteria = Object.assign(searchCriteria, { 'sort.order': sort.direction, 'sort.attribute': sort.active });
    }

    this.userService.fetch(searchCriteria).subscribe((response: GenericPageableResponse<User>) => {
      this.users = response.records;
      this.pageInfo = response.pageInfo;
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


  onPageChange(event): void {
    const pageEvent = event;
    this.fetch(pageEvent.pageIndex, pageEvent.pageSize);
  }

  public ngOnInit() {
    this.fetch();

    this.fetchCurrentUser();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort: Sort) => {
      const order = sort.direction;
      const attribute = sort.active;

      console.log(sort);
      this.fetch(this.pageInfo.pageIndex, this.pageInfo.pageSize, sort);

    });
  }
}
