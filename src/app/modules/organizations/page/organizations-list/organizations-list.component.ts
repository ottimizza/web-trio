import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { UserService } from '@app/http/users.service';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { CreateDialogComponent } from '@modules/organizations/dialogs/create-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

  public currentUser: User;

  public organizations: Array<Organization>;

  displayedColumns: string[] = ['name', 'cnpj'];
  dataSource = this.organizations;

  constructor(public organizationService: OrganizationService, public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateDialogComponent, {
      data: { name: '' },
      panelClass: ['col-sm-12', 'col-md-9', 'col-lg-6']
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public fetch() {
    this.organizationService.fetch({})
      .subscribe((response: GenericPageableResponse<Organization>) => {
        this.organizations = response.records;
        this.dataSource = this.organizations;
      });
  }

  canCreateOrganization = () => [User.Type.ADMINISTRATOR, User.Type.ACCOUNTANT].includes(this.currentUser.type);

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.fetch();
  }

}
