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
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  public currentUser: User = new User();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public form: FormGroup;

  public searchOptions: Array<any> = new Array<any>();
  public isFetching: boolean;

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

  private filters: Array<any> = new Array<any>();

  constructor(
    public storageService: StorageService,
    public userService: UserService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) { }

  public fetch(pageIndex: number = 0, pageSize: number = 10, sort: Sort = null) {
    // this.sortInfo = {};
    this.sortInfo = { 'sort.order': 'asc', 'sort.attribute': 'fullname' };
    if (sort && sort.active && sort.direction) {
      this.sortInfo = { 'sort.order': sort.direction, 'sort.attribute': sort.active };
    }
    let filter = Object.assign({ active: true }, this.sortInfo);
    this.filters.forEach((value, index) => filter = Object.assign(value, filter));

    const searchCriteria = Object.assign({ pageIndex, pageSize }, filter);

    this.userService.fetch(searchCriteria).subscribe((response: GenericPageableResponse<User>) => {
      this.users = response.records;
      this.pageInfo = response.pageInfo;
      this.dataSource = this.users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, {data: { name: '' }});
    dialogRef.afterClosed().subscribe((result) => console.log('The dialog was closed'));
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

  private applyDebouce(formGroup: FormGroup, formControlName: string, delay: number = 300) {
    return formGroup.get(formControlName).valueChanges
      .pipe(debounceTime(delay));
  }
  
  public applyFilter(value: any): void {
    this.filters.push(value);
    this.fetch();
  }

  public ngOnInit() {
    this.fetch();

    this.fetchCurrentUser();

    this.form = this.formBuilder.group({
      search: ['']
    });

    this.applyDebouce(this.form, 'search', 0).subscribe((value) => {
      if (value) {
        this.searchOptions = new Array<any>();
        this.searchOptions.push({ value: {firstName: value}, label: `Buscar por "${value}"` })
        // this.fetchOrganizationByName(value);
      } else {
        this.searchOptions = new Array<any>();
      }
    });
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
