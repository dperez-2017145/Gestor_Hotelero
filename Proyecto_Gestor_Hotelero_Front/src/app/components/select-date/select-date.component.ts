import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRestService } from 'src/app/services/client-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.css']
})
export class SelectDateComponent implements OnInit {

  idReservation: any;
  idRoom: any;

  dates = {
    startDate: "",
    finishDate: ""
  }

  constructor(
    public clientRest: ClientRestService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idReservation = idRuta.get("idReservation");
      this.idRoom = idRuta.get("idRoom");
    });
  }

  pushDate(){
    this.clientRest.pushDate(this.idReservation, this.idRoom, this.dates).subscribe({
      next: (res:any) =>{
        return this.router.navigateByUrl("/reservationService/" + this.idReservation);
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
