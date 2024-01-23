import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './../model/User.model';
import { Admin } from '../model/Admin.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = 'http://localhost:7149/api';
  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private httpClient: HttpClient
  ) { }

  login(user: User) {
    return this.httpClient.post<any>(this.apiUrl + `/User/LoginUser`, user, { headers: this.headers });
  }
  loginAdmin(admin: Admin) {
    return this.httpClient.post<any>(this.apiUrl + '/Admin/LoginAdmin', admin, { headers: this.headers });
  }
}
