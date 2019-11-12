import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  public organizations: Array<Organization>;

  displayedColumns: string[] = ['name', 'cnpj'];
  dataSource = this.organizations;

  constructor(public organizationService: OrganizationService) {
  }

  public fetch() {
    this.organizationService.fetch().subscribe((response: GenericPageableResponse<Organization>) => {
      this.organizations = response.records;
      this.dataSource = this.organizations;
    });
  }

  public ngOnInit() {
    this.fetch();
  }

}
