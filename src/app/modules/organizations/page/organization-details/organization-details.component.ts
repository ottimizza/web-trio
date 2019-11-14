import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { GenericResponse } from '@shared/models/GenericResponse';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetaisComponent implements OnInit {

  public currentUser: User;

  public organization: Organization;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, public organizationService: OrganizationService) {
  }

  public fetchById(id: number) {
    this.organizationService.fetchById(id)
      .subscribe((response: GenericResponse<Organization>) => {
        this.organization = response.record;
      });
  }

  canCreateOrganization = () => [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.activatedRoute.params.subscribe((params: any) => {
      this.fetchById(params.id);
    });
  }

}
