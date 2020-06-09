import { Authority } from './TokenInfo';
import { IBuilder, Builder } from './Builder';

export class UserAuthorities {
  usersId: number;
  authoritiesId: Authority;
}

export class UserProducts {
  productsId: number;
  usersId: number;
}

export class UserProductAuthorities {

  id: number;
  authorities: { name: Authority }[];
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  products: number[];

  public static builder(): IBuilder<UserProductAuthorities> {
    return Builder<UserProductAuthorities>();
  }

  canManage = () => this._can(Authority.ADMIN);
  canEdit = () => this._can(Authority.WRITE);
  canView = () => this._can(Authority.READ);

  private _can(aut: Authority) {
    return this.authorities.map(au => au.name).includes(aut);
  }

}
