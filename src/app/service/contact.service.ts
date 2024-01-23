import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl = 'http://localhost:7149/api';
  httpOptions = {
    headers:new HttpHeaders({'Content-Type':'Application/json'})
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  

  addContact(contact: any) {
    return this.httpClient.post(this.apiUrl
      + `/Contact/InsertContact`
      , contact
    )
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl
      + `/Contact/Delete?contactId=${id}`
    )
  }
  getContact() {
    return this.httpClient.get(this.apiUrl
      + `/Contact/GetContact`
    );
  }
  getTotal() {
    return this.httpClient.get(this.apiUrl + `/Contact/GetTotalOfContact`);
  }
  setStatus(idStatus: any){
    return this.httpClient.put(this.apiUrl + `/Contact/SetStatus?contactId=${idStatus.contactId}&status=${idStatus.status}`,idStatus);
  }

}
