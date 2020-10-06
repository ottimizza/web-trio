import { Injectable } from '@angular/core';
import { environment } from '@env';

import { AuthenticationService } from '@app/authentication/authentication.service';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { GenericResponse } from '@shared/models/GenericResponse';
import { RoomsAccounting } from '@shared/models/RoomsAccounting';
import { User } from '@shared/models/User';

const BASE_URL = `${environment.salasBaseUrl}/api/v1/contabilidades`;

@Injectable({
  providedIn: 'root'
})
export class RoomsAccountingService {

  constructor(private http: HttpHandlerService) { }

  public fetch() {
    const url = `${BASE_URL}/${this.accountingId}`;
    return this.http.get<GenericResponse<RoomsAccounting>>(url, 'Falha ao verificar tipo de licensa da contabilidade!');
  }

  public patch(roomsAccounting: any) {
    const url = `${BASE_URL}/${this.accountingId}`;
    return this.http.patch(url, roomsAccounting, 'Falha ao alterar licensa da contabilidade!');
  }

  public async store() {
    const resultSet = await this.fetch().toPromise();
    const user = User.fromLocalStorage();
    user.organization = Object.assign(user.organization, { pro: resultSet.record.pro });
    localStorage.setItem(AuthenticationService.STORAGE_KEY_USERINFO, JSON.stringify(user));
  }

  private get accountingId() {
    return User.fromLocalStorage().organization.id;
  }

}
