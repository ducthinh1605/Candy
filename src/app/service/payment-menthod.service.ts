import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentMenthodService {
  apiUrl = 'http://alo1234.somee.com/api';

  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getAll() {
    return this.httpClient.get(this.apiUrl + `/PaymentMethod/GetPaymentMethods`);
  }
}
