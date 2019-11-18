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

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    InviteDialogComponent
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

    UsersRoutingModule
  ],
  exports: [],
  entryComponents: [
    InviteDialogComponent
  ]
})
export class UsersModule { }
