import { NgModule } from '@angular/core';
import { PDFComponent } from './pdf.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PDFComponent],
  imports: [CommonModule],
  exports: [PDFComponent]
})
export class PDFModule {}
