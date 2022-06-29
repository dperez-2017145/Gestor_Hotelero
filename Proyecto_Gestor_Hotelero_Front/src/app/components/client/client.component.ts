import { Component, OnInit } from '@angular/core';
import { ClientRestService } from 'src/app/services/client-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  arrayClients: any = [];
  arrayManagers: any = [];
  
  constructor(
    public clientRest: ClientRestService,
  ) { }

  ngOnInit(): void {
    this.getManagersAndClients();
  }

  getManagersAndClients(){
    this.clientRest.getManagersAndClients().subscribe({
      next: (res: any) => {
        this.arrayClients = res.clients;
        this.arrayManagers = res.managers;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
