import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '@env';

import { MatDialog } from '@angular/material/dialog';

import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { Organization } from '@shared/models/Organization';
import { ProductAndAccess } from '@shared/models/Product';
import { User } from '@shared/models/User';
import { FAKE_PRODUCTS, productListTutorial } from '@modules/products/tutorial/product-list.tutorial';
import { TokenInfo } from '@shared/models/TokenInfo';
import { Subscription } from 'rxjs';
import { GuidedTourService } from '@gobsio/ngx-guided-tour';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {

  public readonly LOGO = 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/logo.png';

  public currentUser: User;
  public accountings: Organization[] = [];
  public selectedAccounting: string;

  public pageInfo: PageInfo;

  public products: Array<ProductAndAccess>;

  public tutorial = productListTutorial(TokenInfo.fromLocalStorage().canManage());
  public afterTutorialInit: Subscription;
  public afterTutorialEnded: Subscription;

  constructor(
    public service: UserProductAuthoritiesService,
    public dialog: MatDialog,
    private guidedTourService: GuidedTourService
  ) { }

  ngOnDestroy(): void {
    this.afterTutorialEnded.unsubscribe();
    this.afterTutorialInit.unsubscribe();
  }

  public fetch(): void {
    const filter = { group: `${environment.applicationId}` };
    this.service.fetchProductsAndPermissions(this.currentUser.id, filter)
      .subscribe((response) => {
        this.products = response.records;
      });
  }

  public gotTo(url: string): void {
    window.open(url, '_blank');
  }

  /**
   * Method used to check wheather the user has access to the product,
   * if not the user s redirected to the product's about url.
   *
   * @param product | The object telling if the user has access to the product.
   * @returns the button to be rendered (Access or About).
   */
  public getButtonToShow(product: ProductAndAccess): { url: string, icon: string, label: string } {
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

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.setTutorial();
    this.fetch();
  }

  public setTutorial() {
    this.afterTutorialInit = this.guidedTourService.afterTourInit
      .subscribe(() => this.products.unshift(...FAKE_PRODUCTS));
    this.afterTutorialEnded = this.guidedTourService.afterTourEnded
      .subscribe(() => this.products = this.products.filter(product => product.id > 0));
  }

}
