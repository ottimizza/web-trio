import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { OrganizationRoutingModule } from './organizations.routing';
import { OrganizationListComponent } from './page/organizations-list/organizations-list.component';

@NgModule({
  declarations: [
    OrganizationListComponent
  ],
  imports: [
    FormsModule,
    MatTableModule,

    BreadcrumbModule,
    OrganizationRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class OrganizationModule { }
