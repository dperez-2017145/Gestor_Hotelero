import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ProfileHotelComponent } from './components/profile-hotel/profile-hotel.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';
import { ReservationServiceComponent } from './components/reservation-service/reservation-service.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'hotels', component:HotelsComponent},
  {path:'user', component:UserComponent},
  {path:"selectDate", component: SelectDateComponent},
  {path:"reservationRoom", component: ReservationRoomComponent},
  {path:"reservationService", component: ReservationServiceComponent},
  {path:"profileHotel/:idHotel", component: ProfileHotelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
