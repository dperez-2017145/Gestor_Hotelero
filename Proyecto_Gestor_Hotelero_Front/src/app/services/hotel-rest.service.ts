import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NavBarLoginRestService } from './nav-bar-login-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.navBarRest.getToken()
  });

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getHotels(){
    return this.http.get(environment.baseUri + "admin/getHotels", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getHotel(idHotel:any){
    return this.http.get(environment.baseUri + "hotel/gelHotel" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //SERVICIOS DE LOS EVENTOS DEL HOTEL

  getEvents(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getEvents/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  getEvent(idEvent:any){
    return this.http.get(environment.baseUri + "hotel/getEvent/" + idEvent, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  createEvent(idHotel:any, params: {}){
    return this.http.post(environment.baseUri + "manager/createEvent/" + idHotel, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  updateEvent(idEvent:any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateEvent/" + idEvent, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
  deleteEvent(idEvent:any){
    return this.http.delete(environment.baseUri + "manager/deleteEvent/" + idEvent, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  //SERVICIOS DE LOS SERVICIOS DEL HOTEL

  getServices(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getServices/" + idHotel , {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getService(idService:any){
    return this.http.get(environment.baseUri + "hotel/getService/" + idService, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createService(idHotel:any, params:{}){
    return this.http.post(environment.baseUri + "manager/createService/" + idHotel, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateService(idService: any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateService/" + idService, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteService(idService:any){
    return this.http.delete(environment.baseUri + "manager/deleteService/" + idService, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }
  
}
