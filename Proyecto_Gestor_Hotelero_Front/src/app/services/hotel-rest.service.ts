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

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getHotels(){
    return this.http.get(environment.baseUri + "admin/getHotels", {headers: this.httpOptions});
  }

  getHotel(idHotel:any){
    return this.http.get(environment.baseUri + "hotel/gelHotel" + idHotel, {headers: this.httpOptions});
  }

  //SERVICIOS DE LOS EVENTOS DEL HOTEL

  getEvents(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getEvents/" + idHotel, {headers:this.httpOptions});
  }
  
  getEvent(idEvent:any){
    return this.http.get(environment.baseUri + "hotel/getEvent/" + idEvent, {headers:this.httpOptions});
  }
  
  createEvent(idHotel:any, params: {}){
    return this.http.post(environment.baseUri + "manager/createEvent/" + idHotel, params, {headers:this.httpOptions});
  }
  
  updateEvent(idEvent:any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateEvent/" + idEvent, params, {headers:this.httpOptions});
  }
  
  deleteEvent(idEvent:any){
    return this.http.delete(environment.baseUri + "manager/deleteEvent/" + idEvent, {headers:this.httpOptions});
  }

  //SERVICIOS DE LOS SERVICIOS DEL HOTEL

  getServices(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getServices/" + idHotel , {headers: this.httpOptions});
  }

  getService(idService:any){
    return this.http.get(environment.baseUri + "hotel/getService/" + idService, {headers: this.httpOptions});
  }

  createService(idHotel:any, params:{}){
    return this.http.post(environment.baseUri + "manager/createService/" + idHotel, params, {headers: this.httpOptions});
  }

  updateService(idService: any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateService/" + idService, params, {headers:this.httpOptions});
  }

  deleteService(idService:any){
    return this.http.delete(environment.baseUri + "manager/deleteService/" + idService, {headers: this.httpOptions});
  }
  
}
