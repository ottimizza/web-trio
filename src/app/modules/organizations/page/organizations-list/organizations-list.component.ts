import { Component, Input, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse, PageInfo } from '@shared/models/GenericPageableResponse';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { CreateDialogComponent } from '@modules/organizations/dialogs/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { Sort, MatSort } from '@angular/material/sort';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { getFakeOrganization, ORGANIZATIONS_LIST_TUTORIAL } from '@modules/organizations/tutorial/organizations-list.tutorial';
import { Subscription } from 'rxjs';
import { GuidedTourService } from '@gobsio/ngx-guided-tour';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationListComponent implements OnInit, AfterViewInit, OnDestroy {

  public currentUser: User;

  public organizations: Array<Organization>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatAutocompleteTrigger, { static: true }) autocomplete: MatAutocompleteTrigger;
  displayedColumns: string[] = ['name', 'cnpj'];
  public pageInfo: PageInfo = new PageInfo();
  public sortInfo: any = null;

  public defaultRule = SearchRule.builder()
                        .id('default')
                        .value({ name: '' })
                        .description('Buscar por "{0}"')
                        .build();

  public filters: Array<any> = new Array<any>(
    SearchOption.builder()
      .id('active')
      .value({ active: true })
      .description('Situação: Ativas').build()
  );

  public tutorial = ORGANIZATIONS_LIST_TUTORIAL;
  public afterTutorialInit: Subscription;
  public afterTutorialEnded: Subscription;

  constructor(
    public organizationService: OrganizationService,
    public dialog: MatDialog,
    public guidedTourService: GuidedTourService
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: { name: '' },
      panelClass: ['col-sm-12', 'col-md-9', 'col-lg-6']
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  public fetch(pageIndex: number = 0, pageSize: number = 10, sort: Sort = null) {
    this.sortInfo = { 'sort.order': 'asc', 'sort.attribute': 'name' };
    if (sort && sort.active && sort.direction) {
      this.sortInfo = { 'sort.order': sort.direction, 'sort.attribute': sort.active };
    }
    let filter = Object.assign({ type: 2 }, this.sortInfo);
    this.filters.forEach((value, index) => filter = Object.assign(filter, value.value));
    const searchCriteria = Object.assign({ pageIndex, pageSize }, filter);

    this.organizationService.fetch(searchCriteria)
      .subscribe((response: GenericPageableResponse<Organization>) => {
        this.organizations = response.records;
        this.pageInfo = response.pageInfo;
      });
  }

  onPageChange(event): void {
    const pageEvent = event;
    this.fetch(pageEvent.pageIndex, pageEvent.pageSize);
  }

  canCreateOrganization = () => [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);

  public filteringRules(): Array<SearchRule> {
    return new Array<SearchRule>(
      SearchRule.builder()
        .id('active').value({ active: true })
        .description('Situação: Ativas').keywords(['situacao', 'ativos', 'ativas']).build(),
      SearchRule.builder()
        .id('active').value({ active: false })
        .description('Situação: Inativos').keywords(['situacao', 'inativos', 'inativas']).build()
    );
  }
  public hackings() {
    return [
      HackingRule.builder()
        .id('nome').value({ name: '' })
        .regex(/(nome)\:\s(?<value>.+)/ig)
        .description('Nome: {0}').build(),
      HackingRule.builder()
        .id('cpf_cnpj').value({ cnpj: '' })
        .regex(/(cpf)\:\s(?<value>.+)/ig)
        .description('CPF/CNPJ: {0}').build(),
      HackingRule.builder()
        .id('cpf_cnpj').value({ cnpj: '' })
        .regex(/(cnpj)\:\s(?<value>.+)/ig)
        .description('CPF/CNPJ: {0}').build(),
      HackingRule.builder()
        .id('codigo_erp').value({ codigoERP: '' })
        .regex(/(codigo)\:\s(?<value>.+)/ig)
        .description('Código ERP: {0}').build(),
      HackingRule.builder()
        .id('codigo_erp').value({ codigoERP: '' })
        .regex(/(erp)\:\s(?<value>.+)/ig)
        .description('Código ERP: {0}').build(),
    ];
  }

  public apply(option: SearchOption): void {
    const existingFilter = this.filters.filter(el => el.id === option.id);
    if (existingFilter.length > 0) {
      this.filters.splice(this.filters.indexOf(existingFilter[0]), 1);
    }
    this.filters.push(option);
    this.fetch();
  }

  public removeFilter(value: any): void {
    const filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.fetch();
  }

  public setTutorial() {
    this.afterTutorialInit = this.guidedTourService.afterTourInit.subscribe(() => {
      this.organizations = [getFakeOrganization()].concat(this.organizations);
    });
    this.afterTutorialEnded = this.guidedTourService.afterTourEnded.subscribe(() => {
      this.organizations = this.organizations.filter(org => org.id > 0);
    });
  }

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.fetch();
    this.setTutorial();
  }

  public ngAfterViewInit() {
    this.sort.sortChange.subscribe((sort: Sort) => {
      const order = sort.direction;
      const attribute = sort.active;
      this.fetch(this.pageInfo.pageIndex, this.pageInfo.pageSize, sort);
    });
  }


  ngOnDestroy(): void {
    this.afterTutorialEnded.unsubscribe();
    this.afterTutorialInit.unsubscribe();
  }

}
