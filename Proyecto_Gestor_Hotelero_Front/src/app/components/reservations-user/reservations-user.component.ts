import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientRestService } from 'src/app/services/client-rest.service';
import { ManagerRestService } from 'src/app/services/manager-rest.service';
import { NavBarLoginRestService } from 'src/app/services/nav-bar-login-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservations-user',
  templateUrl: './reservations-user.component.html',
  styleUrls: ['./reservations-user.component.css']
})
export class ReservationsUserComponent implements OnInit {

  idClient: any;
  idhotel: any;
  role: any;
  idReservation: any;

  arrayReservations: any;
  arrayServices: any;

  params = {

  }

  constructor(
    public clientRest: ClientRestService,
    public navBarRest: NavBarLoginRestService,
    public managerRest: ManagerRestService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.role = this.navBarRest.getUser().role;
    if(this.navBarRest.getUser().role == "CLIENT"){
      this.idClient = this.navBarRest.getUser()._id;
      this.getReservations();
    }else{
      this.activatedRoute.paramMap.subscribe((idRuta) => {
        this.idhotel = idRuta.get("idHotel");
      });
      this.getReservationsHotel();
    }
  }

  getReservationsHotel(){
    this.managerRest.getReservationsHotel(this.idhotel).subscribe({
      next: (res: any) => {
        this.arrayReservations = res.reservations;        
      },
      error: (err) => {
        console.log(err);
        
      }
    });
  }

  getReservations(){
    this.clientRest.getReservations(this.idClient).subscribe({
      next: (res: any) => {
        this.arrayReservations = res.reservations;        
      },
      error: (err) => {
        console.log(err);
        
      }
    });
  }

  generateBill(idReservation: any){
    this.managerRest.generateBill(idReservation, this.params).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: res.message,
          icon: 'success',
          showConfirmButton: false
        });
        this.getReservationsHotel();
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

  catchId(idReservation: any){
    return this.idReservation = idReservation;
  }

  cancelReservation(idReservation: any){
    this.clientRest.cancelReservation(idReservation, this.params).subscribe({
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
