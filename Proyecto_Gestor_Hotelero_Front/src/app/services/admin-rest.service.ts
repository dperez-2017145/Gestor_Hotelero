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

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  //FUNCIONES DEL HOTEL

  getHotel(idHotel:any){
    return this.http.get(environment.baseUri + "admin/getHotel/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createHotel(params:{}){
    return this.http.post(environment.baseUri + "admin/createHotel", params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateHotel(idHotel:any, params:{}){
    return this.http.put(environment.baseUri + "admin/updateHotel/" + idHotel, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //DELETE HOTEL
  deleteHotel(idHotel: any){
    return this.http.delete(environment.baseUri + "admin/deleteHotel/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //SERVICIOS DEL MANAGER
  getManager(idManager:any){
    return this.http.get(environment.baseUri + "admin/getManager/" + idManager, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateManager(idManager:any, params:{}){
    return this.http.put(environment.baseUri + "admin/updateManager/" + idManager, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  
}
