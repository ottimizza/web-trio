import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { SharedModule } from '@shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';


import { UsersRoutingModule } from './users.routing';

import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { ModalModule } from '@shared/components/modals/modal.module';
import { InviteDialogComponent } from './dialogs/invite-dialog/invite-dialog.component';
import { AvatarDialogComponent } from './dialogs/avatar-dialog/avatar-dialog.component';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';
import { ImageCropperModule } from '@shared/components/image-cropper/image-cropper.module';
import { InvitationsComponent } from './page/user-list/invitations-tab/invitations.component';
import { UserSecurityComponent } from './page/user-details/user-security-tab/user-security.component';
// import { UserDetailsComponent } from './page/user-details/user-details.component';
import { UserGeneralComponent } from './page/user-details/user-general-tab/user-general.component';
import { UserListComponent } from './page/user-list/userlist-tab/userlist.component';
import { UserDetailsComponent } from './page/user-details/user-details.component';
import { UsersComponent } from './page/user-list/users.component';
import { UserOrganizationsComponent } from './page/user-details/user-organizations-tab/user-organizations.component';
import { DocPipe } from '@shared/pipes/doc.pipe';
import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    UserGeneralComponent,
    UserSecurityComponent,
    UserOrganizationsComponent,

    UserListComponent,
    UserDetailsComponent,
    InvitationsComponent,
    UsersComponent,

    AvatarDialogComponent,
    InviteDialogComponent,
    DragDropDirective
  ],
  imports: [
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // SharedModule,
    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,

    // Table
    MatChipsModule,
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
