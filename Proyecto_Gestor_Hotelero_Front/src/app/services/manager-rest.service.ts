import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';


@Injectable({
  providedIn: 'root'
})
export class ManagerRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getHotelByManager(idManager:any){
    return this.http.get(environment.baseUri + 'manager/getHotelByManager/' + idManager, {headers:this.httpOptions});
  }

}


