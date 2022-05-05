import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { interval, throwError } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

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

  // Note: this method in the future may receive the branding options
  public requestAccessToken() {
    const url = `${BASE_URL}/bridge_token`;
    return this.http.get<{ bridge_token: string }>(url, 'Falha ao obter permissões de acesso!');
  }

  public widgetSuccessCalback(link: string, institution: string) {
    const url = `${BASE_URL}/widget/callback/success`;
    const body = { link, institution, externalId: this.externalId };
    return this.http.post(url, body, 'Falha ao preparar ambiente de callback!');
  }

}
