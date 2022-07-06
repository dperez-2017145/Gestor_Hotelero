import { Component, OnInit } from '@angular/core';
import { HotelRestService } from 'src/app/services/hotel-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-graphic',
  templateUrl: './hotel-graphic.component.html',
  styleUrls: ['./hotel-graphic.component.css']
})
export class HotelGraphicComponent implements OnInit {

    arrayHotels: any;

    chartOptions1 = {
      responsive: true,
      scales: {
          yAxes: [{
                  display: true,
                  ticks: {
                      beginAtZero: true
                  }
              }]
      }
    };
    chartLabels1: any = [];
    chartLegend1 = true;
    chartPlugins1 = [];
  
    chartData1: any = [{
       data: [], 
       label: 'HOTELS' 
      }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

  constructor(
    public hotelRest: HotelRestService
  ) { }

  ngOnInit(): void {
    this.getHotelGrafic();
  }

  getHotelGrafic(){
    this.hotelRest.getHotels().subscribe({
      next: (res: any) => {
        this.arrayHotels = res.hotels;
        this.arrayHotels.forEach((hotel: any) => {
          this.chartLabels1.push(hotel.nameHotel);
          this.chartData1[0].data.push(hotel.request);
          this.chartColors[0].backgroundColor.push(
            `#${Math.floor(Math.random() * 16777215).toString(16)}`
          );
      });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }

}
