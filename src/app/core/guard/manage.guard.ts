import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { User } from '@shared/models/User';

@Injectable({ providedIn: 'root' })
export class ManageGuard implements CanActivate, CanActivateChild {

  canActivate(): boolean {
    const currentUser = User.allInfoFromLocalStorage();
    return (currentUser.canManage() && !currentUser.isCustomer());
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }

}
