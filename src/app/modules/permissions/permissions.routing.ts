import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionManagerComponent } from './page/permission-manager/permission-manager.component';

export const routes: Routes = [
  {
    path: '',
    component: PermissionManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PermissionsRoutingModule { }
