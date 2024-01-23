import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  

  add(product: any) {
    return this.httpClient.post(this.apiUrl
      + `/News/InsertNews`
      , product
    )
  }

  update(news: any) {
    return this.httpClient.put<any>(this.apiUrl
      + `/News/UpdateNews`
      , news
    )
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl
      + `/News/Delete?newsId=${id}`
    )
  }

  getNews() {
    return this.httpClient.get(this.apiUrl
      + '/News/GetNews'
    );
  }
  getById(id: string) {
    return this.httpClient.get(this.apiUrl
      + `/News/GetnewsById?newsId=${id}`
    );
  }
  
  getTotal() {
    return this.httpClient.get(this.apiUrl + `/News/GetTotalOfNews`);
  }

}
