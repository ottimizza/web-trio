import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Injectable } from '@angular/core';
import { UserProducts, UserAuthorities, UserProductAuthorities } from '@shared/models/UserProductAuthorities';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { Authority } from '@shared/models/TokenInfo';

const BASE_URL = environment.oauthBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class UserProductAuthoritiesService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  get(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/v1/users/getInfo?${params}`;
    return this.http.get<GenericPageableResponse<UserProductAuthorities>>(url, this._headers);
  }

  getProducts(group: string) {
    const url = `${BASE_URL}/api/v1/users/products/${group}`;
    return this.http.get(url, this._headers);
  }

  getAllIds(filter: any) {
    const params = this._encode(filter);
    const url = `${BASE_URL}/api/v1/users/usersIds?${params}`;
    return this.http.get(url, this._headers);
  }

  createUserProduct(userProducts: UserProducts) {
    const url = `${BASE_URL}/api/v1/users/products`;
    return this.http.post(url, userProducts, this._headers);
  }

  createUserAuthorities(userAuthoritiy: UserAuthorities) {
    const url = `${BASE_URL}/api/v1/users/authorities`;
    return this.http.post(url, userAuthoritiy, this._headers);
  }

  deleteUserAuthorities(userId: number, authorityId: Authority) {
    const url = `${BASE_URL}/api/v1/users/authorities?usersId=${userId}&authoritiesId=${authorityId}`;
    return this.http.delete(url, this._headers);
  }

  deleteUserProduct(userId: number, productId: number) {
    const url = `${BASE_URL}/api/v1/users/products?usersId=${userId}&productsId=${productId}`;
    return this.http.delete(url, this._headers);
  }

  private get _headers() {
    const headers = this.authenticationService.getAuthorizationHeaders();
    return { headers };
  }

  private _encode(params: any): string {
    return Object.keys(params).map((key) => {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

}
