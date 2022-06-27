import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotelByDirection'
})
export class SearchHotelByDirectionPipe implements PipeTransform {

  transform(hotels:any, search:any) {
    if(search == undefined){
      return hotels;
    }else{
      return hotels.filter((hotel: any) => {
        return hotel.direction.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
