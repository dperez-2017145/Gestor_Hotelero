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

  getRooms(idHotel: any){
    return this.http.get(environment.baseUri + "manager/getRooms/" + idHotel, {headers: this.httpOptions});
  }

  getRoom(idRoom:any){
    return this.http.get(environment.baseUri + "manager/getRoom/" + idRoom, {headers:this.httpOptions});
  }

  addRoom(idHotel:any, params:{}){
    return this.http.post(environment.baseUri + "manager/createRoom/" + idHotel, params, {headers:this.httpOptions});
  }

  updateRoom(idRoom:any, params:{}){
    return this.http.put(environment.baseUri + "manager/updateRoom/" + idRoom, params, {headers:this.httpOptions});
  }

  deleteRoom(idRoom:any){
    return this.http.delete(environment.baseUri + "manager/deleteRoom/" + idRoom, {headers:this.httpOptions});
  }

}


