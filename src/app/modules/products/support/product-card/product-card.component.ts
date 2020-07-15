import { Component, Input } from '@angular/core';
import { Product } from '@shared/models/Product';
import { MatDialog } from '@angular/material';
import { AboutProductDialogComponent } from '@modules/products/dialogs/about-product/about-product-dialog.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  @Input() product: Product;

  constructor(public dialog: MatDialog) {}

  public goTo() {
    window.open(this.product.appUrl, '_black');
  }

  public openAboutDialog() {
    const dialogRef = this.dialog.open(AboutProductDialogComponent, {
      width: '700px',
      data: this.product
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
