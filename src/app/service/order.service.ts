import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../model/Order.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }
  insert(order: any) {
    console.log("🤜 ~ order:", order)
    return this.httpClient.put(this.apiUrl + `/Order/insertOrder`,order)
  }
  getTotal() {
    return this.httpClient.get(this.apiUrl + `/Order/GetOrderTotal`);
  }

  getOrderList(): Observable <Order[]> {
    return this.httpClient.get<Order[]>(this.apiUrl + `/Order/GetAllOrders`);
  }
  setStatus(idStatus: any){
    return this.httpClient.put(this.apiUrl + `/Order/SetStatus?orderId=${idStatus.orderId}&newStatus=${idStatus.status}&userId=${idStatus.userId}`,idStatus);
  }
  getgetOderByUser(userId: string){
    return this.httpClient.get(this.apiUrl
      + `/Order/GetOrderByUser?userId=${userId}`
      )
  }
  getorderHistory(userId: string){
    return this.httpClient.get(this.apiUrl
      + `/Order/Getconfirm?userId=${userId}`
      )
  }
  deleteOrder(id: any): Observable<any> {
    console.log('🌷🌷🌷 ~ id: ', id)
    return this.httpClient.delete<any>(this.apiUrl + `/Order/DeleteOrder?orderId=${id}`)
  }
  deleteOrderByUser(id: any): Observable<any> {
    console.log('🌷🌷🌷 ~ id: ', id)
    return this.httpClient.delete<any>(this.apiUrl + `/Order/DeleteOrderByUser?orderId=${id}`)
  }
  getOderByStatus(status: number){
    console.log("🤜 ~ status:", status)
    return this.httpClient.get(this.apiUrl
      + `/Order/GetOrderByStatus?status=${status}`
      )
  }
  getTopSell() {
    return this.httpClient.get(this.apiUrl
      + `/Order/topSell`
    );
  }
  getRevenue(startDate:any, endDate:any){
    return this.httpClient.get(this.apiUrl
      + `/Order/GetRevenue?startDate=${startDate}&endDate=${endDate}`
      )
  }
  getProductSold(startDate:any, endDate:any){
    return this.httpClient.get(this.apiUrl
      + `/Order/GetProductSold?startDate=${startDate}&endDate=${endDate}`
      )
  }
  getOderSold(startDate:any, endDate:any){
    return this.httpClient.get(this.apiUrl
      + `/Order/GetOderSold?startDate=${startDate}&endDate=${endDate}`
      )
  }
  getTopUser(startDate:any, endDate:any){
    return this.httpClient.get(this.apiUrl
      + `/Order/GetTopUsers?startDate=${startDate}&endDate=${endDate}`
      )
  }
}
