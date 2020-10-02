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
import { ProductCardComponent } from './support/product-card/product-card.component';
import { PDFModule } from '@shared/components/pdf/pdf.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AboutProductDialogComponent } from './dialogs/about-product/about-product-dialog.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductCardComponent,
    AboutProductDialogComponent
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
    MatDialogModule,

    AvatarModule,
    BreadcrumbModule,
    ModalModule,
    PDFModule,

    ProductsRoutingModule

  ],
  exports: [],
  entryComponents: [
    AboutProductDialogComponent
  ]
})
export class ProductsModule { }
