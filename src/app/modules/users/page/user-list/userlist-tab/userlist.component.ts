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
import { stringify } from 'querystring';
import { StringUtils } from '@shared/utils/string.utils';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchOption } from '@shared/components/search/models/SearchOption';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit {

  public currentUser: User = new User();

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;

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

  public defaultRule = SearchRule.builder()
                        .id('default')
                        .value({ firstName: '' })
                        .description('Primeiro nome contém "{0}"')
                        .build();

  public filters: Array<any> = new Array<any>(
    SearchOption.builder()
      .id('active')
      .value({ active: true })
      .description('Situação: Ativo').build()
  );

  public appendOptions = new Array<any>();

  constructor(
    public storageService: StorageService,
    public userService: UserService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder
  ) { }

  public fetch(pageIndex: number = 0, pageSize: number = 10, sort: Sort = null) {
    this.sortInfo = { 'sort.order': 'asc', 'sort.attribute': 'fullname' };
    if (sort && sort.active && sort.direction) {
      this.sortInfo = { 'sort.order': sort.direction, 'sort.attribute': sort.active };
    }
    let filter = Object.assign({}, this.sortInfo);
    this.filters.forEach((value, index) => filter = Object.assign(filter, value.value));
    const searchCriteria = Object.assign({ pageIndex, pageSize }, filter);

    this.userService.fetch(searchCriteria).subscribe((response: GenericPageableResponse<User>) => {
      this.users = response.records;
      this.pageInfo = response.pageInfo;
      this.dataSource = this.users;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InviteDialogComponent, { data: { name: '' } });
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

  public filteringRules(): Array<SearchRule> {
    return new Array<SearchRule>(
      SearchRule.builder()
        .id('type').value({ type: User.Type.ADMINISTRATOR })
        .description('Tipo: Administrador').keywords(['tipo', 'administrador']).build(),
      SearchRule.builder()
        .id('type').value({ type: User.Type.ACCOUNTANT })
        .description('Tipo: Contador').keywords(['tipo', 'contador']).build(),
      SearchRule.builder()
        .id('type').value({ type: User.Type.CUSTOMER })
        .description('Tipo: Cliente').keywords(['tipo', 'cliente']).build(),
      SearchRule.builder()
        .id('active').value({ active: true })
        .description('Situação: Ativo').keywords(['situacao', 'ativos', 'ativas']).build(),
      SearchRule.builder()
        .id('active').value({ active: false })
        .description('Situação: Inativos').keywords(['situacao', 'inativos', 'inativas']).build()
    );
  }
  public hackings() {
    return [
      HackingRule.builder()
        .id('email').value({ username: '' })
        .regex(/(email)\:\s(?<value>.+)/g)
        .description('E-mail: {0}').build(),
      HackingRule.builder()
        .id('regimeTibutario').value({ regimeTibutario: '' })
        .regex(/(regime)\:\s(?<value>.+)/g)
        .description('Regime Tributário: {0}').build(),
    ];
  }

  public apply(option: SearchOption): void {
    let existingFilter = this.filters.filter(el => el.id === option.id);
    if (existingFilter.length > 0) {
      this.filters.splice(this.filters.indexOf(existingFilter[0]), 1);
    }
    this.filters.push(option);
    this.fetch();
  }

  public removeFilter(value: any): void {
    let filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.fetch();
  }

  public ngOnInit() {
    this.fetch();
    this.fetchCurrentUser();
  }

  public ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort: Sort) => {
      const order = sort.direction;
      const attribute = sort.active;
      this.fetch(this.pageInfo.pageIndex, this.pageInfo.pageSize, sort);
    });
  }
}
