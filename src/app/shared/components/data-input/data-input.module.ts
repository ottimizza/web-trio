import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataInputComponent } from './data-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DataInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    DataInputComponent
  ]
})
export class DataInputModule { }
