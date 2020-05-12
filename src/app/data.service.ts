import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVICE = "http://localhost:3000/random"

  constructor( private httpClient: HttpClient) { }
  public sendRequst() {
    return this.httpClient.get(this.REST_API_SERVICE, {responseType: 'json'})
  }
}
