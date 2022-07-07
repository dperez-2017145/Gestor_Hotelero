import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import {Hotel} from 'src/app/Models/hotel.model';
import {Event} from 'src/app/Models/event.model';
import Swal from 'sweetalert2';
import { Service } from 'src/app/Models/service.model';
import { ManagerRestService } from 'src/app/services/manager-rest.service';
import { Room } from 'src/app/Models/room.model';
import { ClientRestService } from 'src/app/services/client-rest.service';
@Component({
  selector: 'app-profile-hotel',
  templateUrl: './profile-hotel.component.html',
  styleUrls: ['./profile-hotel.component.css']
})
export class ProfileHotelComponent implements OnInit {

  arrayServices: any = [];
  arrayEvents: any = [];
  arrayRooms: any = [];

  idHotel: any;
  idEvent: any;
  idService: any;
  idRoom:any;
  idReservation: any;
  
  eventUpdate = {
    _id: "",
    name: "",
    type: "",
    description: "", 
    idHotel: ""
  }

  serviceUpdate = {
    _id: "",
    name: "",
    price: 0,
    idHotel: ""
  }

  roomUpdated = {
    _id: "",
    name:"",
    type:"",
    price: 0,
    status: true,
    idHotel:""
  }

  reservation = {

  }

  role:any;

  hotel:Hotel;
  event:Event;
  service:Service;
  room:Room;

  constructor(
    public hotelRest: HotelRestService,
    public navbarRest: NavBarLoginRestService,
    public activatedRoute: ActivatedRoute,
    public managerRest: ManagerRestService,
    public clientRest: ClientRestService,
    public router: Router
  ) { 
    this.hotel = new Hotel("", "", "", "", "", 0, "");
    this.event = new Event("", "", "", "", ""); 
    this.service = new Service("", "", 0, "");
    this.room = new Room("", "", "", 0, true, "");
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta)=>{
      this.idHotel = idRuta.get("idHotel");
    });
    this.getServices();
    this.getEvents();
    this.role = this.navbarRest.getUser().role;
    this.getRooms();
  }

  //FUNCIONES DE EVENTOS
  
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
  
  getEvent(idEvent:any){
    this.hotelRest.getEvent(idEvent).subscribe({
      next:(res:any)=>{
        this.eventUpdate.name = res.eventFound.name; 
        this.eventUpdate.type = res.eventFound.type;
        this.eventUpdate.description = res.eventFound.description;
        this.eventUpdate.idHotel = res.eventFound.idHotel;
        this.eventUpdate._id = res.eventFound._id;        
      },
      error: (err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }
  
  createEvent(){
    this.hotelRest.createEvent(this.idHotel, this.event).subscribe({
      next:(res:any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getEvents();
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
  
  updateEvent(){
    this.hotelRest.updateEvent(this.eventUpdate._id, this.eventUpdate).subscribe({
      next:(res:any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getEvents();
      },
      error: (err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }
  
  deleteEvent(){
    this.hotelRest.deleteEvent(this.eventUpdate._id).subscribe({
      next:(res:any)=>{
        this.getEvents();
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
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
  
  //FUNCIONES DE SERVICIOS

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

  getService(idService:any){
    this.hotelRest.getService(idService).subscribe({
      next: (res:any)=>{
        this.serviceUpdate._id = res.serviceFound._id,
        this.serviceUpdate.name = res.serviceFound.name,
        this.serviceUpdate.price = res.serviceFound.price,
        this.serviceUpdate.idHotel = res.serviceFound.idHotel
      },
      error: (err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  createService(){
    this.hotelRest.createService(this.idHotel, this.service).subscribe({
      next: (res:any) =>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getServices();
      },
      error: (err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  updateService(){
    this.hotelRest.updateService(this.serviceUpdate._id, this.serviceUpdate).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getServices();
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

  deleteService(){
    this.hotelRest.deleteService(this.serviceUpdate._id).subscribe({
      next: (res:any) =>{
        this.getServices();
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
      },
      error:(err) =>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  // Metodos correspondientes a la habitacion
  getRooms(){
    this.managerRest.getRooms(this.idHotel).subscribe({
      next: (res:any) =>{
        this.arrayRooms = res.rooms;
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

  getRoom(idRoom:any){
    this.managerRest.getRoom(idRoom).subscribe({
      next:(res:any) =>{
        this.roomUpdated._id = res.roomFound._id;
        this.roomUpdated.name = res.roomFound.name;
        this.roomUpdated.type = res.roomFound.type;
        this.roomUpdated.price = res.roomFound.price;
        this.roomUpdated.status = res.roomFound.status;
        this.roomUpdated.idHotel = res.roomFound.idHotel;
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

  createRoom(){
    this.managerRest.addRoom(this.idHotel, this.room).subscribe({
      next:(res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getRooms();
      },
      error: (err)=>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  updateRoom(){
    this.managerRest.updateRoom(this.roomUpdated._id, this.roomUpdated).subscribe({
      next: (res:any)=>{
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getRooms();
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

  deleteRoom(){
    this.managerRest.deleteRoom(this.roomUpdated._id).subscribe({
      next: (res:any) =>{
        this.getRooms();
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
      },
      error:(err) =>{
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 2000
        });
      }
    })
  }

  createReservation(){
    this.clientRest.createReservation(this.navbarRest.getUser()._id, this.idHotel, this.reservation).subscribe({
      next: (res: any) => {
        this.idReservation = res.reservation._id;
        return this.router.navigateByUrl("/reservationRoom/" + this.idReservation + "/" + this.idHotel);
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

  seeReservation(){
    this.router.navigateByUrl("/reservationsUser/"+this.idHotel);
  }

  roomReservation(){
    this.router.navigateByUrl("/roomStadistic/"+this.idHotel);
  }

}
