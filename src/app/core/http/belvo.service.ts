import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { of, throwError } from 'rxjs';

const BASE_URL = `${environment.serviceUrl}/api/v1/belvo`;

@Injectable({ providedIn: 'root' })
export class BelvoService {

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
    const url = `${BASE_URL}/token`;
    return this.http.get<{ access: string }>(url, 'Falha ao obter permissões de acesso!');
  }

  public widgetSuccessCalback(link: string, institution: string) {
    const url = `${BASE_URL}/widget/callback/success`;
    const body = { link, institution, externalId: this.externalId };
    return this.http.post(url, body, 'Falha ao preparar ambiente de callback!');
  }

  public getSdk(winRef: any) {
    const sdk = winRef?.nativeWindow?.belvoSDK;
    return sdk ? of(sdk) : throwError(`Could'nt load Belvo SDK`);
  }

}
