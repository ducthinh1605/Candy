import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './../model/product.model';
import { Catagory } from './../model/Catagory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  getTotal() {
    return this.httpClient.get(this.apiUrl + '/Product/GetTotalOfProduct');
  }

  add(product: any) {
    return this.httpClient.post(this.apiUrl
      + `/Product/InsertProduct`
      , product
    )
  }

  update(product: any) {
    return this.httpClient.put<any>(this.apiUrl
      + `/Product/UpdateProduct/id`
      , product
    )
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl
      + `/Product/DeleteProduct?id=${id}`
    )
  }

  getByCategory(categoryParams: any) {
    return this.httpClient.get(this.apiUrl
      + `/Product/GetProductByCategory?nameCategory=${categoryParams?.name}&count=50`
    );
  }
  getBySupplier(supplierParams: any) {
    return this.httpClient.get(this.apiUrl
      + `/Product/GetProductBySupplier?nameSupplier=${supplierParams?.name}&count=50`
    );
  }

  getProduct() {
    return this.httpClient.get(this.apiUrl
      + '/Product/GetProduct'
    );
  }
  getNewestProduct() {
    return this.httpClient.get(this.apiUrl
      + '/Product/GetNewestProduct'
    );
  }
  GetProductsByExpiration() {
    return this.httpClient.get(this.apiUrl
      + '/Product/GetProductsByExpiration'
    );
  }
  

  getById(id: string) {
    return this.httpClient.get(this.apiUrl
      + `/Product/GetProduct/${id}`
    );
  }
  getProductImagesById(Id: string) {
    return this.httpClient.get<any>(this.apiUrl+`/Product/GetProductIMG?productId=${Id}`);
  }
  searchProduct(keyword: string) {
    return this.httpClient.get(this.apiUrl + `/Product/search?keyword=${keyword}&count=50`);
  }
  getProductSmiliar(Id: string) {
    return this.httpClient.get<any>(this.apiUrl+`/Product/GetSmiliarProduct?productId=${Id}`);
  }
  getProductTopSale() {
    return this.httpClient.get(this.apiUrl
      + `/Product/GetTopSale`
    );
  }
}
