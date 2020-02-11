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


export class SearchRuleBuilder {
  _id: string;
  _value: any;
  _description: string;
  _keywords: string[];
  
  id(id: any): SearchRuleBuilder { this._id = id; return this; } 
  value(value: any): SearchRuleBuilder { this._value = value; return this; } 
  description(description: string): SearchRuleBuilder { this._description = description; return this; } 
  keywords(...args: string[]): SearchRuleBuilder { this._keywords = args; return this; } 

  getId() { return this._id; }
  getValue() { return this._value; }
  getDescription() { return this._description; }
  getKeywords() { return this._keywords; }

  build() {
    return new SearchRule(this);
  }
}

export class SearchRule {
  id: string;
  value: any;
  description: string;
  keywords: string[];
  constructor(builder: SearchRuleBuilder) {
    this.id = builder.getId();
    this.value = builder.getValue();
    this.description = builder.getDescription();
    this.keywords = builder.getKeywords();
  }
  static Builder() {
    return new SearchRuleBuilder();
  }
}

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

  private filters: Array<any> = new Array<any>(
    SearchRule.Builder()
      .id('active')
      .value({active: true})
      .description('Situação: Ativo')
      .keywords('situacao', 'ativos', 'ativas').build()
  );

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
    let filter = Object.assign({ }, this.sortInfo);
    this.filters.forEach((value, index) => filter = Object.assign(filter, value.value));
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
    let filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.filters.push(value);
    this.fetch();
  }

  public removeFilter(value: any): void {
    let filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.fetch();
  }

  public getRules(): SearchRule[] {
    return [
      SearchRule.Builder()
          .id('type')
          .value({type: User.Type.ADMINISTRATOR})
          .description('Tipo: Administrador')
          .keywords('tipo', 'administrador').build(),
      SearchRule.Builder()
          .id('type')
          .value({type: User.Type.ACCOUNTANT})
          .description('Tipo: Contador')
          .keywords('tipo', 'contador').build(),
      SearchRule.Builder()
          .id('type')
          .value({type: User.Type.CUSTOMER})
          .description('Tipo: Cliente')
          .keywords('tipo', 'cliente').build(),
      SearchRule.Builder()
          .id('active')
          .value({active: true})
          .description('Situação: Ativo')
          .keywords('situacao', 'ativos', 'ativas').build(),
      SearchRule.Builder()
          .id('active')
          .value({active: false})
          .description('Situação: Inativos')
          .keywords('situacao', 'inativos', 'inativas').build()      
    ];
  }


  public showOptions(input) {
    const rules = this.getRules();
    this.searchOptions = new Array<any>();
    rules.forEach((rule: SearchRule) => {
      this.searchOptions.push(rule);
    });

    setTimeout(() => {
      input.focus();
    }, 200);
  }


  public ngOnInit() {
    this.fetch();

    this.fetchCurrentUser();

    this.form = this.formBuilder.group({
      search: ['']
    });

    const rules = this.getRules();
    
    this.applyDebouce(this.form, 'search', 0).subscribe((value) => {
      if (value) {
        this.searchOptions = new Array<any>();
        rules.forEach((rule: SearchRule) => {
          if (rule.keywords.some((keyword) => keyword.match(StringUtils.normalize(value.toLowerCase())))) {
            this.searchOptions.push(rule);
          }
        });
        this.searchOptions.push({ id: 'default', value: {firstName: value}, description: `Buscar por "${value}"` });
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
