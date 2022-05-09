import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';

const BASE_URL = `${environment.serviceUrl}/api/v1/trio`;

@Injectable({ providedIn: 'root' })
export class TrioService {

  private externalId: string;

  constructor(
    private http: HttpHandlerService,
  ) {}

  public get username() {
    return this.externalId;
  }

  public set username(username: string) {
    this.externalId = username;
  }

  public requestAccessToken() {
    const url = `${BASE_URL}/bridge_token`;
    return this.http.get<{ bridge_token: string }>(url, 'Falha ao obter permissões de acesso!');
  }

  public widgetSuccessCalback(body: any) {
    const url = `${BASE_URL}/callback/${this.externalId}`;
    return this.http.post(url, body, 'Falha ao registrar credenciais!');
  }

}
