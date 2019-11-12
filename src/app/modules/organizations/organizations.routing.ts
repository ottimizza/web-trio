import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationListComponent } from './page/organizations-list/organizations-list.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: ''
    },
    component: OrganizationListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
