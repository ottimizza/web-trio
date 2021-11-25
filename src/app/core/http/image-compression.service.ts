
import { Injectable, Inject } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Organization } from '@shared/models/Organization';
import { environment } from '@env';
import { HttpHandlerService } from '@app/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ImageCompressionService {

  constructor(private http: HttpHandlerService) { }

  public compress(file: File): Observable<Blob> {
    // const formData = new FormData();
    // formData.append('file', file);
    // const url = `${environment.imageCompressionBaseUrl}/api/v1/image_compressor?size=400`;
    // return this.http.post(url, formData, 'Falha ao comprimir imagem!', { responseType: 'blob' });
    return;
  }

}
