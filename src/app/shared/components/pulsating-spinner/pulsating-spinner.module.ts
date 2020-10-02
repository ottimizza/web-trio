import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PulsatingSpinnerComponent } from './pulsating-spinner.component';



@NgModule({
  declarations: [PulsatingSpinnerComponent],
  imports: [
    CommonModule
  ],
  exports: [PulsatingSpinnerComponent]
})
export class PulsatingSpinnerModule { }
