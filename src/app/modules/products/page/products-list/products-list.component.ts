import { Component, Input, OnInit } from '@angular/core';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { OrganizationService } from '@app/http/organizations.service';
import { Organization } from '@shared/models/Organization';
import { MatDialog } from '@angular/material/dialog';
import { Product } from '@shared/models/Product';
import { ProductService } from '@app/http/products.service';
import { GenericResponse } from '@shared/models/GenericResponse';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public currentUser: User;

  public products: Array<Product>;

  constructor(
    public productService: ProductService,
    public dialog: MatDialog
  ) {
  }

  public fetch() {
    const filter = { group: `ottimizza` };
    this.productService.fetch(filter)
      .subscribe((response: GenericResponse<Product>) => {
        this.products = response.records;
        //         this.dataSource = this.organizations;
      });
    // this.products = [
    //   {
    //     id: null, 
    //     name: `Bússola Contábil`, 
    //     description: `Solução que gera de forma automática, gráficos e indicadores para os seus clientes, na palma da mão!`, 
    //     appUrl: ``, 
    //     imageUrl: `https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/8a/52/2f/8a522f2f-87f6-d692-3eb4-91dadda741e8/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-5.png/246x0w.png`, 
    //     group: `ottimizza`, 
    //   },{
    //     id: null, 
    //     name: `Integrador Contábil`, 
    //     description: `Integre as informações contábeis do seu cliente e garanta a escala que sua contabilidade precisa para evoluir!`, 
    //     appUrl: ``, 
    //     imageUrl: `https://is4-ssl.mzstatic.com/image/thumb/Purple123/v4/8a/52/2f/8a522f2f-87f6-d692-3eb4-91dadda741e8/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-5.png/246x0w.png`, 
    //     group: `ottimizza`, 
    //   }
    // ];
  }

  public ngOnInit() {
    this.currentUser = User.fromLocalStorage();
    this.fetch();
  }

}
