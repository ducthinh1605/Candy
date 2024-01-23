import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catagory } from '../model/Catagory.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrl = 'http://localhost:7149/api/Category';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getTotal() {
    return this.httpClient.get(this.apiUrl + '/GetTotalOfCate');
  }

  getCategoryList(): Observable<Catagory[]> {
    return this.httpClient.get<Catagory[]>(this.apiUrl + '/GetCategory');
  }

  getCateById(id: any) {
    return this.httpClient.get(this.apiUrl
      + `/GetCate/${id}`
    );
  }

  updateCategory(data: any): Observable<Catagory[]> {
    return this.httpClient.put<Catagory[]>(this.apiUrl + '/UpdateCategory', data);
  }

  deleteCategory(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + `/Delete?id=${id}`);
  }

  addCategory(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + `/InsertCategory`, data);
  }

}
