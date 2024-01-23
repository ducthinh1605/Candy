import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  private cartItemSource = new Subject<any[]>();
  cartItem$ = this.cartItemSource.asObservable();


  constructor(private httpClient: HttpClient) { }

    //chia sẻ dữ liệu giữa các component
   private cartDataSubject = new BehaviorSubject<any[]>([]);
   cartData$: Observable<any[]> = this.cartDataSubject.asObservable();

   updateCartData(cartData: any[]) {
     this.cartDataSubject.next(cartData);
   }
   
   oncartChange(cart: any) {
     this.cartItemSource.next(cart);
    }

  
  add(cart: any) {
    return this.httpClient.post<any>(this.apiUrl + 
    `/Cart/InsertCart?userId=${cart.userid}&productId=${cart.productid}&qty=${cart.quantity}`, cart);
  }

  deleteCarts(cart: any) {
    return this.httpClient.delete(
      this.apiUrl
      + `/Cart/DeleteCart?userId=${cart.userid}&productId=${cart.productid}`,
      cart
    )
  }

  getCarts(userId: string) {
    return this.httpClient.get(this.apiUrl
      + `/Cart/GetCart?userId=${userId}`
    )
  }
  getAllCarts() {
    return this.httpClient.get(this.apiUrl
      + `/OderDetail/GetAllCart`
    )
  }

  updateCart(cart: any) {
    return this.httpClient.put<any>(this.apiUrl + `/Cart/UpdateCart?userId=${cart.userid}&productId=${cart.productid}&newQty=${cart.quantity}`, cart);
  }

  
}
