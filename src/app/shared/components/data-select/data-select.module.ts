import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataSelectComponent } from './data-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [DataSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule
  ],
  exports: [DataSelectComponent]
})
export class DataSelectModule { }
