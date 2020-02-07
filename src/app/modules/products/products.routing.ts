import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './page/products-list/products-list.component';

export const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: null, path: '/dashboard/products'
    },
    component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
