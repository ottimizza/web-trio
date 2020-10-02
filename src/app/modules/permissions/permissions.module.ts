import { NgModule } from '@angular/core';
import { PermissionManagerComponent } from './page/permission-manager/permission-manager.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { PermissionsRoutingModule } from './permissions.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { LotPermissionDialogModule } from './dialogs/lot-permission-dialog.module';
import { LotPermissionDialogComponent } from './dialogs/lot-permission-dialog.component';
import { InfoModule } from '@shared/components/info/info.module';
import { NormalizedLayoutModule } from 'app/layout/normalized-layout/normalized-layout.module';

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
    InfoModule,
    NormalizedLayoutModule
  ],
  entryComponents: [LotPermissionDialogComponent]
})
export class PermissionsModule { }
