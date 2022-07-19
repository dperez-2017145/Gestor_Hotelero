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

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getHotelByManager(idManager:any){
    return this.http.get(environment.baseUri + 'manager/getHotelByManager/' + idManager, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getRooms(idHotel: any){
    return this.http.get(environment.baseUri + "manager/getRooms/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getRoom(idRoom:any){
    return this.http.get(environment.baseUri + "manager/getRoom/" + idRoom, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  addRoom(idHotel:any, params:{}){
    return this.http.post(environment.baseUri + "manager/createRoom/" + idHotel, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateRoom(idRoom:any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateRoom/" + idRoom, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteRoom(idRoom:any){
    return this.http.delete(environment.baseUri + "manager/deleteRoom/" + idRoom, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getReservationsHotel(idHotel: any){
    return this.http.get(environment.baseUri + "manager/getReservationsHotel/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  generateBill(idReservation: any, params: {}){
    return this.http.post(environment.baseUri + "manager/generateBill/" + idReservation, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getPeople(idManager: any){
    return this.http.get(environment.baseUri + "manager/getPeople/" + idManager, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

}


