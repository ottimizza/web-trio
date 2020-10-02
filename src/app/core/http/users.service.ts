
import { Injectable, Inject } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';
import { Organization } from '@shared/models/Organization';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = `${environment.oauthBaseUrl}/api/v1/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpHandlerService) { }

  public fetch(searchCriteria: any): Observable<GenericPageableResponse<User>> {
    return this.http.get<GenericPageableResponse<User>>([BASE_URL, searchCriteria], 'Falha ao obter lista de usuários!');
  }

  public fetchById(id: number): Observable<GenericResponse<User>> {
    const url = `${BASE_URL}/${id}`;
    return this.http.get<GenericResponse<User>>(url, 'Falha ao obter usuário!');
  }

  public patch(id: number, data: any): Observable<GenericResponse<User>> {
    const url = `${BASE_URL}/${id}`;
    return this.http.patch<GenericResponse<User>>(url, data, 'Falha ao atualizar usuário!');
  }

  public fetchOrganizations(id: number, searchCriteria: any): Observable<GenericPageableResponse<Organization>> {
    const url = `${BASE_URL}/${id}/organizations`;
    return this.http.get<GenericPageableResponse<Organization>>([url, searchCriteria], 'Falha ao obter organizações!');
  }

  public appendOrganization(id: number, organization: Organization): Observable<GenericPageableResponse<Organization>> {
    const url = `${BASE_URL}/${id}/organizations`;
    return this.http.post<GenericPageableResponse<Organization>>(url, organization, 'Falha ao adicionar organização!');
  }

  public removeOrganization(id: number, organizationId: number): Observable<GenericPageableResponse<Organization>> {
    const url = `${BASE_URL}/${id}/organizations/${organizationId}`;
    return this.http.delete<GenericPageableResponse<Organization>>(url, 'Falha ao remover organização!');
  }

  public fetchInformations() {
    const url = `${BASE_URL}/informations`;
    return this.http.get<GenericResponse<{ departments: string[], roles: string[] }>>(url, 'Fala ao obter informações adicionais!');
  }

}
