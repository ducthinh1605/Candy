
// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class BreakingNewsService {
//   private apiUrl = 'https://MyAllies-breaking-news.p.rapidapi.com/news';

//   constructor(private http: HttpClient) { }

//   getBreakingNews(): Observable<any> {
//     const headers = new HttpHeaders({
//       'X-RapidAPI-Host': 'MyAllies-breaking-news.p.rapidapi.com',
//       'X-RapidAPI-Key': 'c08d0a1bfbmsh1ab7798ecf10cd3p1d457bjsnea9c788f5b8a'
//     });

//     return this.http.get(this.apiUrl, { headers });
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakingNewsService {
  private apiUrl = 'https://text-translator2.p.rapidapi.com/getLanguages';

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<any> {
    const headers = new HttpHeaders({
      'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      'X-RapidAPI-Key': 'c08d0a1bfbmsh1ab7798ecf10cd3p1d457bjsnea9c788f5b8a'
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
