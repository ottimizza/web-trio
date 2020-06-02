import { Component, OnInit } from '@angular/core';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@app/services/toast.service';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { Authority } from '@shared/models/TokenInfo';
import { HackingRule } from '@shared/components/search/models/HackingRule';

@Component({
  templateUrl: './permission-manager.component.html',
  styleUrls: ['./permission-manager.component.scss']
})
export class PermissionManagerComponent implements OnInit {

  filters: SearchOption[] = [];
  records: any[] = [];

  pageInfo: PageInfo;
  pageIndex = 0;
  pageSize = 15;

  constructor(
    public toastService: ToastService
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
    return [
      HackingRule.builder()
      .description('Primeiro nome contém "{0}"')
      .id('firstName')
      .value({ firstName: '' })
      .regex(/(nome)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('Primeiro nome contém "{0}"')
      .id('firstName')
      .value({ firstName: '' })
      .regex(/(primeiro)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('Sobrenome contém "{0}"')
      .id('lastName')
      .value({ lastName: '' })
      .regex(/(segundo)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('Sobrenome contém "{0}"')
      .id('lastName')
      .value({ lastName: '' })
      .regex(/(sobrenome)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('Sobrenome contém "{0}"')
      .id('lastName')
      .value({ lastName: '' })
      .regex(/(ultimo)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('E-mail contém "{0}"')
      .id('email')
      .value({ email: '' })
      .regex(/(email)\:\s(?<value>.+)/ig)
      .build(),
    HackingRule.builder()
      .description('E-mail contém "{0}"')
      .id('email')
      .value({ email: '' })
      .regex(/(e-mail)\:\s(?<value>.+)/ig)
      .build(),
    ];
  }

  filteringRules() {
    return [
      SearchRule.builder()
        .description('Possue permissão para gerenciar')
        .id('authority')
        .value({ authority: Authority.ADMIN })
        .keywords(['possue', 'permissao', 'permissão', 'para', 'gerenciar', 'gerente', 'admin'])
        .build(),
      SearchRule.builder()
        .description('Possue permissão para editar')
        .id('authority')
        .value({ authority: Authority.WRITE })
        .keywords(['possue', 'permissao', 'permissão', 'para', 'editar', 'editor', 'write'])
        .build(),
      SearchRule.builder()
        .description('Possue permissão para visualizar')
        .id('authority')
        .value({ authority: Authority.READ })
        .keywords(['possue', 'permissao', 'permissão', 'para', 'visualizar', 'leitor', 'read'])
        .build(),
      SearchRule.builder()
        .description('Não possue nenhuma permissão')
        .id('authority')
        .value({ authority: '' })
        .keywords(['possue', 'permissao', 'permissão', 'não', 'nada', 'null', 'nenhum', 'nenhuma'])
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
    this.records = [];
    this.pageInfo = null;
    this.pageIndex = 0;
    this.nextPage();
  }

  nextPage() {
    const pageCriteria = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize
    };
    const filter: any = {};
    this.filters.forEach(f => Object.assign(filter, f.value));
    Object.assign(filter, pageCriteria);
  }

}
