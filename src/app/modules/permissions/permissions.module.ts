import { NgModule } from '@angular/core';
import { PermissionManagerComponent } from './page/permission-manager/permission-manager.component';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatChipsModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatFormFieldModule,
  MatDialogModule,
  MatPaginatorModule
} from '@angular/material';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { PermissionsRoutingModule } from './permissions.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { LotPermissionDialogModule } from './dialogs/lot-permission-dialog.module';
import { LotPermissionDialogComponent } from './dialogs/lot-permission-dialog.component';
import { InfoModule } from '@shared/components/info/info.module';

@NgModule({
  declarations: [PermissionManagerComponent],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    MatTableModule,
    ComplexSearchModule,
    BreadcrumbModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    ActionButtonsModule,
    MatDialogModule,
    LotPermissionDialogModule,
    MatPaginatorModule,
    InfoModule
  ],
  entryComponents: [LotPermissionDialogComponent]
})
export class PermissionsModule { }
