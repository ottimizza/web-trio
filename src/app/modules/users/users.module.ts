import { NgModule } from '@angular/core';

// import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';


import { UsersRoutingModule } from './users.routing';

import { UserListComponent } from './page/user-list/user-list.component';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
// import { UserDetailsComponent } from './page/user-details/user-details.component';
import { MatSliderModule } from '@angular/material/slider';
import { UserDetailsComponent } from './page/user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { CommonModule } from '@angular/common';
import { ModalModule } from '@shared/components/modals/modal.module';
import { MatDialogModule } from '@angular/material/dialog';
import { InviteDialogComponent } from './dialogs/invite-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ImageCropperModule } from '@shared/components/image-cropper/image-cropper.module';
import { AvatarDialogComponent } from './dialogs/avatar-dialog/avatar-dialog.component';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    AvatarDialogComponent,
    InviteDialogComponent,
    DragDropDirective
  ],
  imports: [
    FormsModule,
    CommonModule,
    // SharedModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,

    // Table
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    // Modals
    MatDialogModule,

    AvatarModule,
    BreadcrumbModule,
    ModalModule,
    ImageCropperModule,

    UsersRoutingModule
  ],
  exports: [],
  entryComponents: [
    AvatarDialogComponent,
    InviteDialogComponent
  ]
})
export class UsersModule { }
