import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private httpClient: HttpClient) { }
  apiUrl = 'http://localhost:7149/api/';

  getTotal() {
    return this.httpClient.get(this.apiUrl + `User/GetTotalOfUser`);
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `User/GetUsers`);
  }

  register(user: User) {
    return this.httpClient.post<any>(this.apiUrl + `User/RegisterUser`, user);
  }

  editUser(data: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + `User/Update`, data);
  }

  userByID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `User/GetUser/${id}`);
  }

  deleteUser(id: any): Observable<any> {
    console.log('🌷🌷🌷 ~ id: ', id)
    return this.httpClient.delete<any>(this.apiUrl + `User/Delete?id=${id}`)
  }
  getuserinfo (credentials: {account:any, password:any}){
    return this.httpClient.get<any>(this.apiUrl+`User/GetUserInfo?account=${credentials?.account}&password=${credentials?.password}`)
  }
  getadmininfo (admin: {account:any, password:any}){
    return this.httpClient.get<any>(this.apiUrl+`Admin/GetAdminId?account=${admin?.account}&password=${admin?.password}`)
  }
  sendEmail(email: any): Observable<any> {
    console.log("🤜 ~ email:", email)
    return this.httpClient.post<any>(this.apiUrl + `User/sendVerification?email=${email}`,email);
  }
  
  checkcode(key: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + `User/compareKey?userInput=${key}`,key);
  }
  getByName(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `User/GetAllUserOrderByName`);
  }
  getNewest(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `User/GetAllUserOrderByLatest`);
  }
  
}
