import { Component, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { Product, ProductAndAccess } from '@shared/models/Product';
import { ProductService } from '@app/http/products.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';
import { Organization } from '@shared/models/Organization';
import { OrganizationService } from '@app/http/organizations.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { UserService } from '@app/http/users.service';
import { MatSelectChange } from '@angular/material/select';
import { AboutProductDialogComponent } from '@modules/products/dialogs/about-product/about-product-dialog.component';
import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { NavbarLayoutComponent } from 'app/layout/navbar-layout/navbar-layout.component';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public readonly LOGO = 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/logo.png';

  public currentUser: User;
  public accountings: Organization[] = [];
  public selectedAccounting: string;

  public pageInfo: PageInfo;

  public products: Array<ProductAndAccess>;

  constructor(
    public service: UserProductAuthoritiesService,
    public dialog: MatDialog
  ) { }

  public fetch() {
    const filter = { group: `${environment.applicationId}` };
    this.service.fetchProductsAndPermissions(this.currentUser.id, filter)
      .subscribe((response) => {
        this.products = response.records.map(prod => {
          // Apenas para testess
          // if (!environment.production) {
          // prod.name = ('ottimizza.' + prod.name).replace(' ', '.').toLowerCase();
          // prod.description = '';
          //   prod.aboutUrl = 'https://google.com';
          // }
          prod.name = prod.name.slice(10);
          return prod;
        });
      });

  }

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.fetch();
  }

  public gotTo(url: string) {
    window.open(url, '_blank');
  }

  public buttonDetails(product: ProductAndAccess) {
    if (product.access) {
      return {
        url: product.appUrl,
        icon: 'fad fa-long-arrow-right',
        label: 'Acessar'
      };
    }
    return {
      url: product.aboutUrl,
      icon: 'fal fa-info-circle',
      label: 'Conhecer'
    };
  }

}
