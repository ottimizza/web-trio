
import { Injectable, Inject } from '@angular/core';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { Observable } from 'rxjs';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { GenericResponse } from '@shared/models/GenericResponse';
import { Organization } from '@shared/models/Organization';
import { environment } from '@env';
import { Product } from '@shared/models/Product';
import { HttpHandlerService } from '@app/services/http-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpHandlerService) { }

  public fetch(searchCriteria: any): Observable<GenericResponse<Product>> {
    const url = `${environment.oauthBaseUrl}/api/v1/products`;
    return this.http.get<GenericResponse<Product>>([url, searchCriteria], 'Falha ao obter lista de produtos!');
  }

  public create(organization: Organization): Observable<GenericResponse<Product>> {
    const url = `${environment.oauthBaseUrl}/api/v1/products`;
    return this.http.post<GenericResponse<Product>>(url, organization, 'Falha ao criar ligação produto-organização!');
  }

  public patch(id: number, organization: Organization): Observable<GenericResponse<Product>> {
    const url = `${environment.oauthBaseUrl}/api/v1/products/${id}`;
    return this.http.patch<GenericResponse<Product>>(url, organization, 'Falha ao alterar produto');
  }

}
