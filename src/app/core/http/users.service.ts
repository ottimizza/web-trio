
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { User } from '@shared/models/User';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authorizationService: AuthenticationService) { }

  public fetch(filters = {}, pageIndex = 0, pageSize = 10): Observable<GenericPageableResponse<User>> {
    const url = `${environment.oauthBaseUrl}/api/v1/users`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericPageableResponse<User>>(url, { headers });
  }

  public fetchById(id: number): Observable<GenericResponse<User>> {
    const url = `${environment.oauthBaseUrl}/api/v1/users/${id}`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.get<GenericResponse<User>>(url, { headers });
  }

  public patch(id: number, data: any): Observable<GenericResponse<User>> {
    const url = `${environment.oauthBaseUrl}/api/v1/users/${id}`;
    const headers = this.authorizationService.getAuthorizationHeaders();
    return this.http.patch<GenericResponse<User>>(url, data, { headers });
  }

}
