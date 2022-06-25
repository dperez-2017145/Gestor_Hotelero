import { Component, OnInit } from '@angular/core';
import { AdminRestService } from 'src/app/services/admin-rest.service';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  arrayHotels: any = [];

  role:any;

  idHotel:any;

  addHotel = {
    nameHotel: "",
    direction: "",
    phone: "",
    email: "",
    request: 0,
    idManager: "",
    name:"",
    username:"",
    password:"",
    role:""
  }

  updateHotel ={
    _id: "",
    nameHotel: "",
    direction:"",
    phone:"",
    email:""
  }

  constructor(
    public hotelRest: HotelRestService,
    public navbarRest: NavBarLoginRestService,
    public adminRest: AdminRestService
  ) { }

  ngOnInit(): void {
    this.getHotels();
    this.role = this.navbarRest.getUser().role;
  }

  getHotels(){
    this.hotelRest.getHotels().subscribe({
      next: (res: any) =>{
        this.arrayHotels = res.hotels;
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  getHotel(idHotel:any){
    this.adminRest.getHotel(idHotel).subscribe({
      next:(res:any)=>{
        this.updateHotel.nameHotel = res.hotelFound.nameHotel;
        this.updateHotel.direction = res.hotelFound.direction;
        this.updateHotel.email = res.hotelFound.email;
        this.updateHotel.phone = res.hotelFound.phone;
        this.updateHotel._id = res.hotelFound._id;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  createHotel(){
    this.adminRest.createHotel(this.addHotel).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getHotels();
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

  updatedHotel(){
    this.adminRest.updateHotel(this.updateHotel._id, this.updateHotel).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getHotels();
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
