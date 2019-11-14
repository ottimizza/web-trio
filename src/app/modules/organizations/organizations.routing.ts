import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './page/organizations-list/organizations-list.component';
import { OrganizationDetaisComponent } from './page/organization-details/organization-details.component';

export const routes: Routes = [
  {
    path: '',
    component: OrganizationListComponent
  },
  {
    path: ':id',
    data: {
      breadcrumb: null, path: '/dashboard/organizations'
    },
    component: OrganizationDetaisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
