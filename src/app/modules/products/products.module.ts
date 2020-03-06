import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { AvatarModule } from '@shared/components/avatar/avatar.module';
import { ModalModule } from '@shared/components/modals/modal.module';
import { DragDropDirective } from '@shared/directives/drag-drop.directive';
import { DocPipe } from '@shared/pipes/doc.pipe';
import { ProductsRoutingModule } from './products.routing';
import { ProductListComponent } from './page/products-list/products-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@NgModule({
  declarations: [
    ProductListComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,

    MatFormFieldModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule,

    AvatarModule,
    BreadcrumbModule,
    ModalModule,

    ProductsRoutingModule
  ],
  exports: [],
  entryComponents: [
    // Dialogs..
  ]
})
export class ProductsModule { }
