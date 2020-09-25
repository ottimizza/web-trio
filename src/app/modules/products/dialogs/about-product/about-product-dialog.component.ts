import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '@shared/models/Product';

@Component({
  templateUrl: './about-product-dialog.component.html',
})
export class AboutProductDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AboutProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) { }

}
