import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { StorageService } from '@app/services/storage.service';
import { ModalComponent } from '@shared/components/modals/modal.component';
import { MatDialog } from '@angular/material/dialog';
import { InviteDialogComponent } from '@modules/users/dialogs/invite-dialog/invite-dialog.component';
import { Sort, MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  public currentUser: User = new User();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public users: Array<User>;
  public empties: Array<any> = [
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
    { empty: 'true' },
  ];
  public pageInfo: PageInfo = new PageInfo();
  public sortInfo: any = null;

  displayedColumns: string[] = ['avatar', 'fullname', 'username', 'type'];
  dataSource = this.empties;

  constructor(public storageService: StorageService, public userService: UserService, public dialog: MatDialog) {
  }

  public fetch(pageIndex: number = 0, pageSize: number = 10, sort: Sort = null) {
    // this.sortInfo = {};
    this.sortInfo = { 'sort.order': 'asc', 'sort.attribute': 'fullname' };
    if (sort && sort.active && sort.direction) {
      this.sortInfo = { 'sort.order': sort.direction, 'sort.attribute': sort.active };
    }
    const filter = Object.assign({ active: true }, this.sortInfo);
    
    const searchCriteria = Object.assign({ pageIndex, pageSize }, filter);

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
    console.log(pageEvent);
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
