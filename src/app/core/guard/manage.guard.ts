import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { TokenInfo } from '@shared/models/TokenInfo';

@Injectable()
export class ManageGuard implements CanActivate, CanActivateChild {

  canActivate(): boolean {
    return TokenInfo.fromLocalStorage().canManage();
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
