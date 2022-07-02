import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRestService } from 'src/app/services/client-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-room',
  templateUrl: './reservation-room.component.html',
  styleUrls: ['./reservation-room.component.css']
})
export class ReservationRoomComponent implements OnInit {

  idHotel: any;
  idReservation: any;
  idRoom: any;

  arrayRooms: any = [];

  constructor(
    public clientRest: ClientRestService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get("idHotel");
      this.idReservation = idRuta.get("idReservation");
    });
    this.getRooms();
  }

  getRooms(){
    this.clientRest.getRooms(this.idHotel).subscribe({
      next: (res: any) => {
        this.arrayRooms = res.rooms;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateRoom(){
    this.clientRest.updateRoom(this.idReservation, this.idRoom).subscribe({
      next: (res: any) => {
        return this.router.navigateByUrl("/selectDate/" + this.idReservation + "/" + this.idRoom);
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

}
