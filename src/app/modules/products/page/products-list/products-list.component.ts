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
    public organizationService: OrganizationService,
    public userService: UserService,
    public dialog: MatDialog
  ) { }

  public fetch() {
    const filter = { group: `${environment.applicationId}` };
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
    if (this.currentUser.type === 0) {
      this.nextPage();
    }
  }

  public nextPage() {
    if (!this.pageInfo || this.pageInfo.hasNext) {
      const pageCriteria = { pageIndex: this.pageInfo ? this.pageInfo.pageIndex + 1 : 0, pageSize: 20 };
      const sort = { 'sort.attribute': 'name', 'sort.order': 'asc' };
      const filter = { type: Organization.Type.ACCOUNTING };
      // Object.assign(filter, sort);
      // Object.assign(filter, pageCriteria);
      Object.assign(filter, sort, pageCriteria);
      this.organizationService.fetch(filter).subscribe(result => {
        result.records.forEach(rec => this.accountings.push(rec));
        this.pageInfo = result.pageInfo;
      });
    }
  }

  public selectAccounting(event: MatSelectChange) {
    this.userService.patch(this.currentUser.id, { organization: { id: event.value } }).subscribe();
  }

}
