import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { User } from '@shared/models/User';
import { Organization } from '@shared/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpHandlerService) { }

  public fetchInvitationByToken(token: string): Observable<GenericResponse<any>> {
    const url = `${environment.oauthBaseUrl}/api/v2/invitations?token=${token}`;
    return this.http.get<GenericResponse<any>>(url, 'Não foi possível encontrar os detalhes do cadastro', {});
  }

  public register(user: User, organization: Organization, token: string = null) {
    const url = `${environment.oauthBaseUrl}/api/v2/invitations/register?token=${token}`;
    const body = { user, organization };
    return this.http.post<GenericResponse<any>>(url, body, 'Não foi possível registrar o usuário!', {});
  }

}
