import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';
import { environment } from 'src/environments/environment';
import { HotelRestService } from './hotel-rest.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });


  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService,
    public hotelRest: HotelRestService
  ) { }

  //FUNCIONES DEL HOTEL

  getHotel(idHotel:any){
    return this.http.get(environment.baseUri + "admin/getHotel/" + idHotel, {headers:this.httpOptions});
  }

  createHotel(params:{}){
    return this.http.post(environment.baseUri + "admin/createHotel", params, {headers:this.httpOptions});
  }

  updateHotel(idHotel:any, params:{}){
    return this.http.put(environment.baseUri + "admin/updateHotel/" + idHotel, params, {headers:this.httpOptions});
  }

  //DELETE HOTEL PENDIENTE


  //SERVICIOS DEL MANAGEr

  getManager(idManager:any){
    return this.http.get(environment.baseUri + "admin/getManager/" + idManager, {headers:this.httpOptions});
  }

  updateManager(idManager:any, params:{}){
    return this.http.put(environment.baseUri + "admin/updateManager/" + idManager, params, {headers:this.httpOptions});
  }
}
