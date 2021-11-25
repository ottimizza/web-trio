import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { ToastService } from '@app/services/toast.service';
import { environment } from '@env';
import { of, throwError } from 'rxjs';

const BASE_URL = `${environment.serviceUrl}/api/v1/belvo`;

@Injectable({ providedIn: 'root' })
export class BelvoService {

  constructor(
    private http: HttpHandlerService,
  ) {}

  // Note: this method in the future may receive the branding options
  public requestAccessToken() {
    const url = `${BASE_URL}/token`;
    return this.http.get<{ access: string }>(url, 'Falha ao obter permissões de acesso!');
  }

  // TODO: switch username parameter for a non guessable externalId
  public widgetSuccessCalback(link: string, institution: string, username: string) {
    const url = `${BASE_URL}/widget/callback/success`;
    const body = { link, institution, externalId: username };
    return this.http.post(url, body, 'Falha ao preparar ambiente de callback!');
  }

  public getSdk(winRef: any) {
    if (winRef.nativeWindow.belvoSDK) {
      return of(winRef.nativeWindow.belvoSDK);
    } else {
      console.error(`couldn't load belvo sdk`);
      return throwError(`Could'nt load Belvo SDK`);
    }
  }

}
