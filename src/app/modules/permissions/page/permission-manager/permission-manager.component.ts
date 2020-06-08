import { Component, OnInit } from '@angular/core';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@app/services/toast.service';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { Authority } from '@shared/models/TokenInfo';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { MatTableDataSource, MatOptionSelectionChange, MatCheckboxChange, MatDialog, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { UserProductAuthorities, UserProducts } from '@shared/models/UserProductAuthorities';
import { LoggerUtils } from '@shared/utils/logger.utils';
import { User } from '@shared/models/User';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { LotPermissionDialogComponent } from '@modules/permissions/dialogs/lot-permission-dialog.component';
import { TypeConversorUtils } from '@shared/utils/type-conversor.utils';
import { environment } from '@env';

@Component({
  templateUrl: './permission-manager.component.html',
  styleUrls: ['./permission-manager.component.scss'],
})
export class PermissionManagerComponent implements OnInit {

  displayedColumns: string[] = ['user', 'access', 'read', 'write', 'admin'];
  dataSource = new MatTableDataSource<UserProductAuthorities>([]);
  selection = new SelectionModel<UserProductAuthorities>(true, []);

  access: any = {};
  read: any = {};
  write: any = {};
  admin: any = {};

  filters: SearchOption[] = [];

  pageInfo = new PageInfo();
  pageIndex = 0;
  pageSize = 15;

  currentUser: User;

  products: { name: string, id: number }[] = [];

  button: ActionButton[] = [{
    icon: 'fad fa-unlock-alt',
    id: 'button',
    label: 'Acesso em lote',
    color: new HexColor(environment.backgroundTheme)
  }];

  USER_PLACEHOLDER = './assets/images/Portrait_Placeholder.png';

  constructor(
    public toastService: ToastService,
    public service: UserProductAuthoritiesService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    this.service.getProducts().subscribe((results: any[]) => {
      this.products = results;
    }, err => {
      this.toastService.show('Falha ao obter lista de produtos', 'danger');
      LoggerUtils.throw(err);
    });
    this.fetch();
  }

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.nextPage();
  }

  get defaultRule() {
    return SearchOption.builder()
      .description('Primeiro nome contém "{0}"')
      .id('firstName')
      .value({ firstName: '' })
      .build();
  }

  hackings() {
    const HRB = (desc: string, id: string, value: any, regex: RegExp) => {
      return HackingRule.builder()
        .description(desc)
        .id(id)
        .value(value)
        .regex(regex)
        .build();
    };

    return [
      HRB('Primeiro nome contém "{0}"', 'firstName', { firstName: '' }, /(nome)\:\s(?<value>.+)/ig),
      HRB('Primeiro nome contém "{0}"', 'firstName', { firstName: '' }, /(primeiro)\:\s(?<value>.+)/ig),
      HRB('Sobrenome contém "{0}"', 'lastName', { lastName: '' }, /(segundo)\:\s(?<value>.+)/ig),
      HRB('Sobrenome contém "{0}"', 'lastName', { lastName: '' }, /(sobrenome)\:\s(?<value>.+)/ig),
      HRB('Sobrenome contém "{0}"', 'lastName', { lastName: '' }, /(ultimo)\:\s(?<value>.+)/ig),
      HRB('E-mail contém "{0}"', 'email', { email: '' }, /(email)\:\s(?<value>.+)/ig),
      HRB('E-mail contém "{0}"', 'email', { email: '' }, /(e-mail)\:\s(?<value>.+)/ig)
    ];
  }

  filteringRules() {
    const SRB = (desc: string, id: string, value: any, keywords: string[]) => {
      return SearchRule.builder()
        .description(desc)
        .id(id)
        .value(value)
        .keywords(['possue', 'permissao', 'permissão', 'para'].concat(keywords))
        .build();
    };
    return [
      SRB('Possue permissão para gerenciar', 'authority', { authority: Authority.ADMIN }, ['gerenciar', 'gerente', 'admin']),
      SRB('Possue permissão para editar', 'authority', { authority: Authority.WRITE }, ['editar', 'editor', 'write']),
      SRB('Possue permissão para visualizar', 'authority', { authority: Authority.READ }, ['ver', 'leitor', 'read']),
      SRB('Não possue nenhuma permissão', 'authority', { authority: 'NENHUM' }, ['não', 'nada', 'null', 'nenhum', 'nenhuma']),
      SearchRule.builder()
        .description('Tipo: Administrador')
        .id('type')
        .value({ type: 0 })
        .keywords(['tipo', '0', 'administrador'])
        .build(),
      SearchRule.builder()
        .description('Tipo: Contador')
        .id('type')
        .value({ type: 1 })
        .keywords(['tipo', '1', 'contador'])
        .build(),
      SearchRule.builder()
        .description('Tipo: Cliente')
        .id('type')
        .value({ type: 2 })
        .keywords(['tipo', '2', 'cliente'])
        .build(),
    ];
  }

  removeFilter(filter: SearchOption) {
    this.filters.splice(this.filters.indexOf(filter), 1);
    this.fetch();
  }

  filterApply(filter: SearchOption) {
    const filters = this.filters.map(so => so.id);
    const index = filters.indexOf(filter.id);
    if (index >= 0) {
      this.filters.splice(index, 1);
    }
    this.filters.push(filter);
    this.fetch();
  }

  fetch() {
    this.pageInfo = null;
    this.pageIndex = 0;
    this.nextPage();
    // this._fake();
  }

  nextPage() {
    const pageCriteria = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    const filter: any = {};
    this.filters.forEach(f => Object.assign(filter, f.value));
    Object.assign(filter, pageCriteria);

    this.toastService.showSnack('Obtendo informações');
    this.service.get(filter).subscribe(results => {
      this._reset();
      this.toastService.hideSnack();
      this.pageInfo = results.pageInfo;
      results.records.forEach(rec => {
        this._setDefault(TypeConversorUtils.fromAny<UserProductAuthorities>(rec, new UserProductAuthorities()));
      });
      this.dataSource = new MatTableDataSource<UserProductAuthorities>(results.records);
      LoggerUtils.log(results);
    }, err => {
      this.toastService.show('Falha ao obter usuários', 'danger');
      LoggerUtils.throw(err);
    });
  }

  setProduct(e: MatOptionSelectionChange, userId: number) {
    if (!e.isUserInput) {
      return;
    }
    const product: UserProducts = {
      productsId: e.source.value,
      usersId: userId
    };
    // tslint:disable-next-line: no-string-literal
    const observable$ = e.source['_selected'] ?
      this.service.createUserProduct(product) :
      this.service.deleteUserProduct(userId, e.source.value);

    observable$.subscribe(() => {
      this.toastService.show('Acesso alterado com sucesso!', 'primary');
    }, err => {
      this.toastService.show('Falha ao alterar acesso', 'danger');
      LoggerUtils.throw(err);
    });
  }

  getAccessKey(id: number) {
    const key = id.toString()
      .replace(/0/ig, 'aA')
      .replace(/1/ig, 'bB')
      .replace(/2/ig, 'cC')
      .replace(/3/ig, 'dD')
      .replace(/4/ig, 'eE')
      .replace(/5/ig, 'fF')
      .replace(/6/ig, 'gG')
      .replace(/7/ig, 'hH')
      .replace(/8/ig, 'iI')
      .replace(/9/ig, 'jJ');
    return key;
  }

  openDialog() {
    const dialogRef = this.dialog.open(LotPermissionDialogComponent, {
      width: '568px',
      data: { filters: this.filters }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetch();
      }
    });
  }

  setAuthority(event: MatCheckboxChange, authority: Authority, userId: number) {
    const observable$ = event.checked ?
      this.service.createUserAuthorities({ usersId: userId, authoritiesId: authority }) :
      this.service.deleteUserAuthorities(userId, authority);

    observable$.subscribe(() => {
      this.toastService.show(`Permissão ${event.checked ? 'concedida' : 'negada'} com sucesso!`, 'primary');
    }, err => {
      this.toastService.show(`Falha ao ${event.checked ? 'conceder' : 'negar'} permissão`, 'danger');
      LoggerUtils.throw(err);
    });
  }

  private _reset() {
    this.access = {};
    this.read  = {};
    this.write = {};
    this.admin = {};
  }

  private _setDefault(user: UserProductAuthorities) {
    this.access[this.getAccessKey(user.id)] = user.products;
    this.read[this.getAccessKey(user.id)] = user.canView();
    this.write[this.getAccessKey(user.id)] = user.canEdit();
    this.admin[this.getAccessKey(user.id)] = user.canManage();
  }

}
