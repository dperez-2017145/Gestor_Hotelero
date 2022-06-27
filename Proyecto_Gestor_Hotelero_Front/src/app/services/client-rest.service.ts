import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ClientRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getClient(idClient:any){
    return this.http.get(environment.baseUri + "client/getClient/" + idClient, {headers:this.httpOptions});
  }

  updateClient(idClient:any, params:{}){
    return this.http.put(environment.baseUri + "client/updateClient/" + idClient, params, {headers:this.httpOptions});
  }

}
