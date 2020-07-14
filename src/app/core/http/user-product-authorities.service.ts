import { environment } from '@env';
import { Injectable } from '@angular/core';
import { UserProducts, UserAuthorities, UserProductAuthorities } from '@shared/models/UserProductAuthorities';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Authority } from '@shared/models/TokenInfo';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.oauthBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserProductAuthoritiesService {

  constructor(private http: HttpHandlerService) {}

  get(searchCriteria: any) {
    const url = `${BASE_URL}/api/v1/users/getInfo`;
    return this.http.get<GenericPageableResponse<UserProductAuthorities>>([url, searchCriteria], 'Falha ao obter usuários!');
  }

  getProducts(group: string) {
    const url = `${BASE_URL}/api/v1/users/products/${group}`;
    return this.http.get<{ id: number, name: string }[]>(url, 'Falha ao obter lista de produtos!');
  }

  getAllIds(filter: any) {
    const url = `${BASE_URL}/api/v1/users/usersIds`;
    return this.http.get([url, filter], 'Falha ao obter usuários afetados!');
  }

  createUserProduct(userProducts: UserProducts) {
    const url = `${BASE_URL}/api/v1/users/products`;
    return this.http.post(url, userProducts, 'Falha ao conceder acesso!');
  }

  createUserAuthorities(userAuthoritiy: UserAuthorities) {
    const url = `${BASE_URL}/api/v1/users/authorities`;
    return this.http.post(url, userAuthoritiy, 'Falha ao conceder permissão!');
  }

  deleteUserAuthorities(userId: number, authorityId: Authority) {
    const url = `${BASE_URL}/api/v1/users/authorities?usersId=${userId}&authoritiesId=${authorityId}`;
    return this.http.delete(url, 'Falha ao negar permissão!');
  }

  deleteUserProduct(userId: number, productId: number) {
    const url = `${BASE_URL}/api/v1/users/products?usersId=${userId}&productsId=${productId}`;
    return this.http.delete(url, 'Falha ao negar acesso');
  }

}
