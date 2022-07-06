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

  getManagersAndClients(){
    return this.http.get(environment.baseUri + "admin/getManagersAndClients", {headers: this.httpOptions});
  }

  createReservation(idClient: any, idHotel: any, params: any){
    return this.http.post(environment.baseUri + "client/createReservation/" + idClient + "/" + idHotel, params, {headers: this.httpOptions});
  }

  updateRoom(idReservation:any, room: any){
    let body = JSON.stringify({room});
    return this.http.put(environment.baseUri + "client/updateRoom/" + idReservation, body, {headers: this.httpOptions});
  }

  getRooms(idHotel: any){
    return this.http.get(environment.baseUri + "manager/getRooms/" + idHotel, {headers: this.httpOptions});
  }

  pushDate(idReservation:any, idRoom: any, params:any){
    return this.http.put(environment.baseUri + "client/pushDate/" + idReservation + "/" + idRoom, params, {headers: this.httpOptions});
  }

  getReservation(idReservation: any){
    return this.http.get(environment.baseUri + "client/getReservation/" + idReservation, {headers: this.httpOptions});
  }

  getServices(idHotel: any){
    return this.http.get(environment.baseUri + "hotel/getServices/" + idHotel, {headers: this.httpOptions});
  }

  pushServices(idReservation: any, idService: any){
    let body = JSON.stringify({idService});
    return this.http.put(environment.baseUri + "client/pushServices/" + idReservation, body, {headers: this.httpOptions});
  }

  confirmateReservation(idReservation: any, params: any){
    let body = JSON.stringify({params});
    return this.http.put(environment.baseUri + "client/confirmateReservation/" + idReservation, body, {headers: this.httpOptions});
  }

  getReservations(idClient: any){
    return this.http.get(environment.baseUri + "client/getReservations/" + idClient, {headers: this.httpOptions});
  }

  getDates(idRoom: any){
    return this.http.get(environment.baseUri + "client/getDates/"+idRoom, {headers: this.httpOptions});
  }

  cancelReservation(idReservation: any, params: any){
    return this.http.put(environment.baseUri + "client/cancelReservation/" + idReservation, params, {headers: this.httpOptions});
  }

  deleteAccount(idClient: any){
    return this.http.delete(environment.baseUri + "client/deleteAccount/" + idClient, {headers: this.httpOptions});
  }

}
