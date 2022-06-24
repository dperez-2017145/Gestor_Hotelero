import { Component, OnInit } from '@angular/core';
import { ManagerRestService } from 'src/app/services/manager-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  idHotel:any

  constructor(
    public navBarRest: NavBarLoginRestService,
    public managerRest: ManagerRestService
  ) { }

  ngOnInit(): void {
    this.getHotelByAdmin();
  }

  getHotelByAdmin(){
    this.managerRest.getHotelByManager(this.navBarRest.getUser()._id).subscribe({
      next: (res:any)=>{
        return this.idHotel = res.hotelFound._id;
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

}
