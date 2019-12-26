import { NgModule } from '@angular/core';

import { MatTableModule } from '@angular/material/table';

import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { FormsModule } from '@angular/forms';
import { OrganizationRoutingModule } from './organizations.routing';
import { OrganizationListComponent } from './page/organizations-list/organizations-list.component';
import { CommonModule } from '@angular/common';
import { OrganizationDetaisComponent } from './page/organization-details/organization-details.component';
import { CreateDialogComponent } from './dialogs/create-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AvatarDialogComponent } from './dialogs/avatar-dialog/avatar-dialog.component';
import { ImageCropperModule } from '@shared/components/image-cropper/image-cropper.module';

@NgModule({
  declarations: [
    AvatarDialogComponent,
    OrganizationListComponent,
    OrganizationDetaisComponent,
    CreateDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    // Material
    MatTableModule,
    MatDialogModule,

    BreadcrumbModule,
    OrganizationRoutingModule,

    ImageCropperModule
  ],
  exports: [],
  providers: [],
  entryComponents: [
    AvatarDialogComponent,
    CreateDialogComponent
  ]
})
export class OrganizationModule { }
