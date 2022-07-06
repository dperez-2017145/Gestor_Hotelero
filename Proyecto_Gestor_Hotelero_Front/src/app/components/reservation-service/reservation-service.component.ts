import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRestService } from 'src/app/services/client-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservation-service',
  templateUrl: './reservation-service.component.html',
  styleUrls: ['./reservation-service.component.css']
})
export class ReservationServiceComponent implements OnInit {

  idReservation: any;
  idHotel: any;
  idService: any;

  arrayServices: any;

  params: any ={};

  constructor(
    public clientRest: ClientRestService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta) => {
      this.idReservation = idRuta.get("idReservation");
    });
    this.getReservation(this.idReservation);
  }

  getReservation(idReservation: any){
    this.clientRest.getReservation(idReservation).subscribe({
      next: (res: any) => {
        this.getServices(res.reservation.idHotel);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getServices(idHotel: any){
    this.clientRest.getServices(idHotel).subscribe({
      next: (res: any) => {
        this.arrayServices = res.servicesFound;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  pushServices(){
    this.clientRest.pushServices(this.idReservation, this.idService).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: true
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  confirmateReservation(){
    this.clientRest.confirmateReservation(this.idReservation, this.idReservation).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: true
        });
        return this.router.navigateByUrl("/hotels");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  cancelReservation(){
    this.clientRest.cancelReservation(this.idReservation, this.params).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: true
        });
        return this.router.navigateByUrl("/hotels");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
