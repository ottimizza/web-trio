import { TypeConversorUtils } from '@shared/utils/type-conversor.utils';
import { User } from '@shared/models/User';

export enum Authority {
  ADMIN = 'ADMIN',
  READ = 'READ',
  WRITE = 'WRITE',
}

export class TokenInfo {

  authenticated: boolean;
  authorities: { authority: Authority }[];
  clientOnly: false;
  credentials: string;
  details: any;
  name: string;
  oauth2Request: any;
  principal: any;
  userAuthentication: any;

  public static fromLocalStorage(): TokenInfo {
    const storedToken = JSON.parse(localStorage.getItem('token-info') || '{}');
    return TypeConversorUtils.fromAny<TokenInfo>(storedToken, new TokenInfo());
  }

  canManage = () => this._can(Authority.ADMIN);
  canEdit = () => this._can(Authority.WRITE);
  canView = () => this._can(Authority.READ);

  private _can(aut: Authority) {
    const userInfo: TokenInfo = User.allInfoFromLocalStorage() as any;
    return userInfo.authorities.map(au => au.authority).includes(aut);
  }

}
