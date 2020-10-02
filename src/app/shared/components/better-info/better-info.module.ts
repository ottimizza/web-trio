import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BetterInfoComponent } from './better-info.component';

@NgModule({
  declarations: [BetterInfoComponent],
  imports: [CommonModule],
  exports: [BetterInfoComponent]
})
export class BetterInfoModule {}
