import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchHotelByName'
})
export class SearchHotelByNamePipe implements PipeTransform {

  transform(hotels:any, search:any) {
    if(search == undefined){
      return hotels;
    }else{
      return hotels.filter((hotelName: any) => {
        return hotelName.nameHotel.toLowerCase().includes(search.toLowerCase());
      });
    }
  }

}
