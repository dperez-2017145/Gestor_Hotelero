import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  arrayHotels: any = [];

  constructor(
    public hotelRest: HotelRestService
  ) { }

  ngOnInit(): void {
    this.getHotels();
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

}
