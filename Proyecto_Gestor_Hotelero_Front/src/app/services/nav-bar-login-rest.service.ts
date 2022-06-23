import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavBarLoginRestService {

  httpOptions = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": this.getToken()
  });

  constructor(
    private http: HttpClient
  ) { }

  //LOGIN
  login(params: {}){
    return this.http.post(environment.baseUri + "admin/login", params, {headers: this.httpOptions});
  }

  //Register Client
  register(params: {}){
    return this.http.post(environment.baseUri + "client/register", params, {headers: this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem("token");
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = "";
    }
    return token;
  }

  //Método para obtener el usuario del local storage
  getUser(){
    let globalUser = localStorage.getItem("user");
    let user;
    if(globalUser != undefined){
      user = JSON.parse(globalUser);
    }else{
      user = "";
    }
    return user;
  }

}
