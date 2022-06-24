import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile-hotel',
  templateUrl: './profile-hotel.component.html',
  styleUrls: ['./profile-hotel.component.css']
})
export class ProfileHotelComponent implements OnInit {

  arrayServices: any = [];
  arrayEvents: any = [];

  idHotel: any;

  role:any;

  constructor(
    public hotelRest: HotelRestService,
    public navbarRest: NavBarLoginRestService,
    public activatedRoute: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta)=>{
      this.idHotel = idRuta.get("idHotel");
    });
    this.getServices();
    this.getEvents();
    this.role = this.navbarRest.getUser().role;
  }

  getServices(){
    this.hotelRest.getServices(this.idHotel).subscribe({
      next: (res:any) =>{
        this.arrayServices = res.servicesFound;
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

  getEvents(){
    this.hotelRest.getEvents(this.idHotel).subscribe({
      next: (res:any) =>{
        this.arrayEvents = res.eventsFound
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
