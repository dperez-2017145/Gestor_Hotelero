import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  role:any;

  constructor(
    public router: Router,
    public navBarRestLogin: NavBarLoginRestService
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRestLogin.getUser().role;
  }
  
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl("home");
  }

  home(){
    if(this.role === "ADMIN" || this.role === "CLIENT"){
      this.router.navigateByUrl("/hotels");
    }else{
      this.router.navigateByUrl("/user");
    }
  }

}
