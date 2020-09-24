import { NgModule } from '@angular/core';
import { LotPermissionDialogComponent } from './lot-permission-dialog.component';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { SinglePermissionDialogComponent } from './single-permission/single-permission-dialog.component';

@NgModule({
  declarations: [LotPermissionDialogComponent, SinglePermissionDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatChipsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  exports: [LotPermissionDialogComponent, SinglePermissionDialogComponent]
})
export class LotPermissionDialogModule {}
