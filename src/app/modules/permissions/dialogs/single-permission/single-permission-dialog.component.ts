import { Component, Inject, OnInit } from '@angular/core';
import { UserProductAuthoritiesService } from '@app/http/user-product-authorities.service';
import { ToastService } from '@app/services/toast.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatCheckboxChange } from '@angular/material';
import { UserProductAuthorities, UserProducts } from '@shared/models/UserProductAuthorities';
import { Authority } from '@shared/models/TokenInfo';
import { User } from '@shared/models/User';
import { TypeConversorUtils } from '@shared/utils/type-conversor.utils';
import { LoggerUtils } from '@shared/utils/logger.utils';

@Component({
  templateUrl: './single-permission-dialog.component.html'
})
export class SinglePermissionDialogComponent implements OnInit {

  authorities = [
    { name: 'ver', value: Authority.READ },
    { name: 'editar', value: Authority.WRITE },
    { name: 'gerenciar', value: Authority.ADMIN }
  ];

  authorityManager: boolean[] = [];
  productManager: boolean[] = [];

  userId: number;

  constructor(
    public service: UserProductAuthoritiesService,
    public toast: ToastService,
    public dialogRef: MatDialogRef<SinglePermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { products: { name: string, id: number }[], user: UserProductAuthorities }
  ) { }

  ngOnInit(): void {
    this.userId = User.fromLocalStorage().id;
    this._startAuthorities();
    this._startProducts();
  }

  setAuthority(event: MatCheckboxChange) {
    const authoritiesId = event.source.value as Authority;
    const observable$ = event.checked ?
      this.service.createUserAuthorities({ authoritiesId, usersId: this.data.user.id }) :
      this.service.deleteUserAuthorities(this.data.user.id, authoritiesId);

    observable$.subscribe(() => {
      this.toast.show(`Permissão ${event.checked ? 'concedida' : 'revogada'} com sucesso!`, 'primary');
    });
  }

  setProduct(event: MatCheckboxChange) {
    const observable$ = event.checked ?
      this.service.createUserProduct({ usersId: this.data.user.id, productsId: +event.source.value }) :
      this.service.deleteUserProduct(this.data.user.id, +event.source.value);

    observable$.subscribe(() => {
      this.toast.show(`Acesso ${event.checked ? 'concedida' : 'revogada'} com sucesso!`, 'primary');
    });
  }

  private _startProducts() {
    this.productManager = this.data.products.map(prod => this.data.user.products.includes(prod.id));
  }

  private _startAuthorities() {
    const user = TypeConversorUtils.fromAny<UserProductAuthorities>(this.data.user, new UserProductAuthorities());
    this.authorityManager[0] = user.canView();
    this.authorityManager[1] = user.canEdit();
    this.authorityManager[2] = user.canManage();
  }


}
