import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientRestService } from 'src/app/services/client-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  userAdmin ={
    name: "",
    username:"",
    role:""
  }

  userClient ={
    name:"",
    lastname:"",
    email:"",
    phone:"",
    username:""
  }

  role:any;


  constructor(
    public navBarRest: NavBarLoginRestService,
    public clientRest: ClientRestService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    if(this.role === 'ADMIN' || this.role === 'MANAGER'){
      this.getData();
    }else{
      this.getClient();
    }
  }

  getData(){
    this.userAdmin.name = this.navBarRest.getUser().name;
    this.userAdmin.username = this.navBarRest.getUser().username;
    this.userAdmin.role = this.navBarRest.getUser().role;
  }

  getClient(){
    this.clientRest.getClient(this.navBarRest.getUser()._id).subscribe({
      next: (res:any)=>{
        this.userClient.name = res.clientFound.name;
        this.userClient.lastname = res.clientFound.lastname;
        this.userClient.email = res.clientFound.email;
        this.userClient.phone = res.clientFound.phone;
        this.userClient.username = res.clientFound.username;
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  updateClient(){
    this.clientRest.updateClient(this.navBarRest.getUser()._id, this.userClient).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getClient();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  deleteAccount(){
    this.clientRest.deleteAccount(this.navBarRest.getUser()._id).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: true
        });
        this.router.navigateByUrl("");
        localStorage.clear();
      },
      error:(err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
