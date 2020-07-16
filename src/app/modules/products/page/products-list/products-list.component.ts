import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '@shared/models/Product';
import { ProductService } from '@app/http/products.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';
import { Organization } from '@shared/models/Organization';
import { OrganizationService } from '@app/http/organizations.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { UserService } from '@app/http/users.service';
import { MatSelectChange } from '@angular/material/select';
import { AboutProductDialogComponent } from '@modules/products/dialogs/about-product/about-product-dialog.component';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public currentUser: User;
  public accountings: Organization[] = [];
  public selectedAccounting: string;

  public pageInfo: PageInfo;

  public products: Array<Product>;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog
  ) { }

  public fetch() {
    const filter = { group: `${environment.applicationId}` };
    this.productService.fetch(filter)
      .subscribe((response: GenericResponse<Product>) => {
        this.products = response.records;
        //         this.dataSource = this.organizations;
      });

  }

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.fetch();
  }

  public gotTo(url: string) {
    window.open(url, '_blank');
  }

  public openAboutDialog(data: Product) {
    const dialogRef = this.dialog.open(AboutProductDialogComponent, {
      width: '700px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
