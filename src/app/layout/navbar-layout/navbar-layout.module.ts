import { NgModule } from '@angular/core';

/* ********************************************************************************* *
 * Angular Material
 * ********************************************************************************* */
import { MatMenuModule } from '@angular/material/menu';

/* ********************************************************************************* *
 * Shared Components
 * ********************************************************************************* */
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { BrandModule } from '@shared/components/brand/brand.module';

/* ********************************************************************************* *
 * Exported Components
 * ********************************************************************************* */
import { NavbarLayoutComponent } from './navbar-layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SigninAsDialogModule } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.module';
import { SigninAsDialogComponent } from '@modules/organizations/dialogs/signin-as-dialog/signin-as-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PulsatingSpinnerModule } from '@shared/components/pulsating-spinner/pulsating-spinner.module';

@NgModule({
  declarations: [
    NavbarLayoutComponent
  ],
  imports: [
    // FormsModule,
    CommonModule,
    RouterModule,
    AvatarModule,
    BrandModule,
    SigninAsDialogModule,
    MatMenuModule,
    MatDialogModule,

    PulsatingSpinnerModule
  ],
  exports: [
    NavbarLayoutComponent
  ],
  providers: [],
  entryComponents: [SigninAsDialogComponent]
})
export class NavbarLayoutModule { }
