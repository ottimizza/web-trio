
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { environment } from '@env';
import { HttpHandlerService } from '@app/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private http: HttpHandlerService) { }

  public invite(data = {}): Observable<GenericResponse<any>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites`;
    return this.http.post<GenericResponse<any>>(url, data, 'Falha ao criar convite!');
  }

  public fetch(pageIndex: number = 0, pageSize: number = 10): Observable<GenericPageableResponse<any>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites?page_index=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<GenericPageableResponse<any>>(url, 'Falha ao obter lista de convites!');
  }

  public pendingCount(): Observable<GenericResponse<number>> {
    const url = `${environment.oauthBaseUrl}/api/v1/invites/pending_count`;
    return this.http.get<GenericResponse<number>>(url, 'Falha ao obter total de pendentes!');
  }

}
