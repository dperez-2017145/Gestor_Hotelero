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

  pushServices(idReservation: any, params: any){
    return this.http.put(environment.baseUri + "client/pushServices/" + idReservation, params, {headers: this.httpOptions});
  }

}
