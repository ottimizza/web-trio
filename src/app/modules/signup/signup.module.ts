import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from '@shared/pipes/pipes.module';
import { SignupRoutingModule } from './signup.routing';
import { SignupComponent } from './page/signup/signup.component';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    // SharedModule,

    SignupRoutingModule,
  ],
  exports: [],
  entryComponents: []
})
export class SignupModule { }
