import { Component, OnInit } from '@angular/core';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@app/services/toast.service';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { Authority } from '@shared/models/TokenInfo';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { MatTableDataSource, MatOptionSelectionChange } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { UserProductAuthorities } from '@shared/models/UserProductAuthorities';
import { LoggerUtils } from '@shared/utils/logger.utils';
import { User } from '@shared/models/User';

@Component({
  templateUrl: './permission-manager.component.html',
  styleUrls: ['./permission-manager.component.scss']
})
export class PermissionManagerComponent implements OnInit {

  displayedColumns: string[] = ['user', 'access', 'read', 'write', 'admin'];
  dataSource = new MatTableDataSource<UserProductAuthorities>([]);
  selection = new SelectionModel<UserProductAuthorities>(true, []);

  access: any = {};

  filters: SearchOption[] = [];

  pageInfo: PageInfo;
  pageIndex = 0;
  pageSize = 15;

  products: { name: string, id: number }[] = [
    { name: 'Bússola', id: 1 },
    { name: 'OIC 3.0', id: 2 },
    { name: 'Sugestão de Melhoria', id: 3 }
  ];

  USER_PLACEHOLDER = './assets/images/Portrait_Placeholder.png';

  constructor(
    public toastService: ToastService,
    public userProductAuthoritiesService: UserProductAuthoritiesService
  ) { }

  get defaultRule() {
    return SearchOption.builder()
      .description('Primeiro nome contém "{0}"')
      .id('name')
      .value({ name: '' })
      .build();
  }

  ngOnInit(): void {
    this.fetch();
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
      SRB('Possue permissão para visualizar', 'authority', { authority: Authority.READ }, ['visualizar', 'leitor', 'read']),
      SRB('Não possue nenhuma permissão', 'authority', { authority: 'NENHUM' }, ['não', 'nada', 'null', 'nenhum', 'nenhuma'])
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
    this.userProductAuthoritiesService.get(filter).subscribe(results => {
      this.toastService.hideSnack();
      this.pageInfo = results.pageInfo;
      results.records.forEach(rec => {
        this.access[this.getAccessKey(rec.id)] = rec.products;
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
    console.log(e);
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

}
