import { Injectable } from '@angular/core';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { environment } from '@env';
import { GenericResponse } from '@shared/models/GenericResponse';
import { HomeMessage } from '@shared/models/HomeMessage';

const BASE_URL = `${environment.oauthBaseUrl}/api/v1/message`;

@Injectable({ providedIn: 'root' })
export class HomeMessageService {

  constructor(private http: HttpHandlerService) {}

  public getMessage() {
    return this.http.get<GenericResponse<HomeMessage>>(BASE_URL, '');
  }

}
