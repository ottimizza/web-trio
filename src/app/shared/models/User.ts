import { TypeConversorUtils } from '@shared/utils/type-conversor.utils';
import { Organization } from './Organization';
import { TokenInfo, Authority } from './TokenInfo';

export class UserAdditionalInformation {
  public role: string;
  public birthDate: string;
  public accountingDepartment: string;
}

export class User {

  static Type = class {
    static ADMINISTRATOR = 0;
    static ACCOUNTANT = 1;
    static CUSTOMER = 2;
  };

  id: number;
  username: string;
  password: string;

  active: boolean;
  activated: boolean;
  type: number;

  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;

  organization: Organization;

  additionalInformation: UserAdditionalInformation;

  authorities: { authority: Authority }[];

  static fromLocalStorage(): User {
    const storedUser = JSON.parse(localStorage.getItem('user-info') || '{}');
    return TypeConversorUtils.fromAny<User>(storedUser, new User());
  }

  public static allInfoFromLocalStorage(): User & TokenInfo {
    return Object.assign(this.fromLocalStorage(), TokenInfo.fromLocalStorage());
  }

  public get fullName() {
    return `${this.firstName || this.lastName || ''}`.trim();
  }

  isCustomer = () => this.type === User.Type.CUSTOMER;

  isAccountant = () => this.type === User.Type.ACCOUNTANT;

  isAdministrator = () => this.type === User.Type.ADMINISTRATOR;

  canManage = () => this._can(Authority.ADMIN);
  canEdit = () => this._can(Authority.WRITE);
  canView = () => this._can(Authority.READ);

  private _can(aut: Authority) {
    // const userInfo: TokenInfo = User.fromLocalStorage() as any;
    return this.authorities.map(au => au.authority).includes(aut);
  }

}
