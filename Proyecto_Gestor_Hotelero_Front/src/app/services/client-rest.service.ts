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

  httpOption = new HttpHeaders().set("Content-Type", "application/json");

  constructor(
    public http: HttpClient,
    public navBarRest: NavBarLoginRestService
  ) { }

  getClient(idClient:any){
    return this.http.get(environment.baseUri + "client/getClient/" + idClient, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateClient(idClient:any, params:{}){
    return this.http.put(environment.baseUri + "client/updateClient/" + idClient, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getManagersAndClients(){
    return this.http.get(environment.baseUri + "admin/getManagersAndClients", {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  createReservation(idClient: any, idHotel: any, params: any){
    return this.http.post(environment.baseUri + "client/createReservation/" + idClient + "/" + idHotel, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  updateRoom(idReservation:any, room: any){
    let body = JSON.stringify({room});
    return this.http.put(environment.baseUri + "client/updateRoom/" + idReservation, body, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getRooms(idHotel: any){
    return this.http.get(environment.baseUri + "manager/getRooms/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  pushDate(idReservation:any, idRoom: any, params:any){
    return this.http.put(environment.baseUri + "client/pushDate/" + idReservation + "/" + idRoom, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getReservation(idReservation: any){
    return this.http.get(environment.baseUri + "client/getReservation/" + idReservation, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getServices(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getServices/" + idHotel, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  pushServices(idReservation: any, idService: any){
    let body = JSON.stringify({idService});
    return this.http.put(environment.baseUri + "client/pushServices/" + idReservation, body, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  confirmateReservation(idReservation: any, params: any){
    let body = JSON.stringify({params});
    return this.http.put(environment.baseUri + "client/confirmateReservation/" + idReservation, body, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getReservations(idClient: any){
    return this.http.get(environment.baseUri + "client/getReservations/" + idClient, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  getDates(idRoom: any){
    return this.http.get(environment.baseUri + "client/getDates/"+idRoom, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  cancelReservation(idReservation: any, params: any){
    return this.http.put(environment.baseUri + "client/cancelReservation/" + idReservation, params, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

  deleteAccount(idClient: any){
    return this.http.delete(environment.baseUri + "client/deleteAccount/" + idClient, {headers: this.httpOption.set("Authorization",this.navBarRest.getToken())});
  }

}
