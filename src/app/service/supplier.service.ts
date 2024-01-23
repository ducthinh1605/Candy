import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../model/Supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiUrl = 'http://localhost:7149/api/Suplier';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(private httpClient: HttpClient) { }

  getTotal() {
    return this.httpClient.get(this.apiUrl + '/GetTotalOfSup');
  }

  getSupList(): Observable<Supplier[]> {
    return this.httpClient.get<Supplier[]>(this.apiUrl + '/GetSupplier');
  }

  getSupbyID(id: any): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl + `/GetSupplier/${id}`);
  }

  updateSupplier(data: any): Observable<Supplier[]> {
    return this.httpClient.put<Supplier[]>(this.apiUrl + '/UpdateSupplier', data);
  }

  deleteSuplier(id: any): Observable<any> {
    return this.httpClient.delete<any>(this.apiUrl + `/DeleteSupplier?id=${id}`);
  }

  addSupplier(data: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + `/InsertSupplier`, data);
  }

}
