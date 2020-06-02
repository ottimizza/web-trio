import { NgModule } from '@angular/core';
import { PermissionManagerComponent } from './page/permission-manager/permission-manager.component';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatChipsModule, MatIconModule } from '@angular/material';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { PermissionsRoutingModule } from './permissions.routing';

@NgModule({
  declarations: [PermissionManagerComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    MatTableModule,
    ComplexSearchModule,
    BreadcrumbModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class PermissionsModule { }
