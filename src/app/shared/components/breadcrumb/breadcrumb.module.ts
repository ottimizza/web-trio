import { NgModule } from '@angular/core';
import { BreadcrumbComponent } from './breadcrumb.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgxGuidedTourModule } from '@gobsio/ngx-guided-tour';

@NgModule({
  declarations: [
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxGuidedTourModule.forRoot()
  ],
  exports: [
    BreadcrumbComponent
  ]
})
export class BreadcrumbModule {
}
