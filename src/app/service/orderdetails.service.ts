import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailsService {
  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getOderDetails(orderId: string) {
    return this.httpClient.get(this.apiUrl
      + `/OderDetail/GetOrderDetails?orderId=${orderId}`
    )
  }
  getgetOderDetailsByUser(userId: string){
    return this.httpClient.get(this.apiUrl
      + `/OderDetail/GetOrderDetailsByUserID?userId=${userId}`
      )
  }

  insert(order: any) {
    console.log("🤜 ~ order:", order)
    return this.httpClient.post(this.apiUrl + `/OderDetail/insertOrder`,order)
  }
}
