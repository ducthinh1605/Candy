import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../model/product.model';
import { Product_img } from '../model/product_img.model';

@Injectable({
  providedIn: 'root'
})
export class ProductIMGService {
  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }


  add(product: any) {
    console.log("🤜 ~ product:", product)
    return this.httpClient.post(this.apiUrl
      + `/ProductIMG/InsertProduct_IMG`
      , product
    )
  }

  update(product: any) {
    return this.httpClient.put<any>(this.apiUrl
      + `/ProductIMG/UpdateProduct_img/id`
      , product
    )
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl
      + `/ProductIMG/DeleteProduct?id=${id}`
    )
  }


  getProductIMG() {
    return this.httpClient.get(this.apiUrl
      + '/ProductIMG/GetProduct_IMG'
    );
  }

  getById(id: string) {
    return this.httpClient.get(this.apiUrl
      + `/ProductIMG/GetProduct_img/${id}`
    );
  }
  getByProductId(id: string) {
    return this.httpClient.get(this.apiUrl
      + `/ProductIMG/GetProduct_imgbypro?productId=${id}`
    );
  }
  getTotal() {
    return this.httpClient.get(this.apiUrl + '/ProductIMG/GetTotalOfProductIMG');
  }
  
}
