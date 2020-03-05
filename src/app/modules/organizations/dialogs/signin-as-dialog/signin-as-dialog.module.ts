import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SigninAsDialogComponent } from './signin-as-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { InfoModule } from '@shared/components/info/info.module';

@NgModule({
  declarations: [SigninAsDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ComplexSearchModule,
    InfoModule
  ],
  exports: [SigninAsDialogComponent]
})
export class SigninAsDialogModule { }
