
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Organization } from '@shared/models/Organization';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  public ENV = 0;

  public environments = {
    0: {
      url: 'https://development-oauth-server.herokuapp.com',
      clientId: '76179baad962d1b8ce4d',
      redirectURI: `${window.location.origin}/auth/callback`
    },
    2: {
      url: 'https://staging-oauth-server.herokuapp.com',
      clientId: 'f749f0eed32f9ddb8138',
      redirectURI: `${window.location.origin}/login`
    },
    3: {
      url: 'https://ottimizza-oauth-server.herokuapp.com',
      clientId: '',
      redirectURI: `${window.location.origin}/login`
    }
  };

  constructor(private http: HttpClient, private authorizationService: AuthenticationService) { }

  public fetch(filters = {}, pageIndex = 0, pageSize = 10): Observable<GenericPageableResponse<Organization>> {
    const url = `${this.environments[this.ENV].url}/api/v1/organizations`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericPageableResponse<Organization>>(url, { headers });
  }

  public fetchById(id: number): Observable<GenericResponse<Organization>> {
    const url = `${this.environments[this.ENV].url}/api/v1/organizations/${id}`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericResponse<Organization>>(url, { headers });
  }

}
