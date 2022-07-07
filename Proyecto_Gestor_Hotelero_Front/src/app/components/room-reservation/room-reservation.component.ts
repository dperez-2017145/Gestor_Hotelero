import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManagerRestService } from 'src/app/services/manager-rest.service';

@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.css']
})
export class RoomReservationComponent implements OnInit {

  idHotel: any;

  arrayRooms: any;

  constructor(
    public managerRest: ManagerRestService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idHotel = idRuta.get("idHotel");
    });
    this.getRooms();
  }

  getRooms(){
    this.managerRest.getRooms(this.idHotel).subscribe({
      next: (res: any) => {
        this.arrayRooms = res.rooms;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  

}
