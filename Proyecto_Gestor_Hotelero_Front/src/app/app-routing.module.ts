import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { HomeComponent } from './components/home/home.component';
import { HotelGraphicComponent } from './components/hotel-graphic/hotel-graphic.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ProfileHotelComponent } from './components/profile-hotel/profile-hotel.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';
import { ReservationServiceComponent } from './components/reservation-service/reservation-service.component';
import { ReservationsUserComponent } from './components/reservations-user/reservations-user.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'hotels', component:HotelsComponent},
  {path:'user', component:UserComponent},
  {path:"selectDate/:idReservation/:idRoom", component: SelectDateComponent},
  {path:"reservationRoom/:idReservation/:idHotel", component: ReservationRoomComponent},
  {path:"reservationService/:idReservation", component: ReservationServiceComponent},
  {path:"profileHotel/:idHotel", component: ProfileHotelComponent},
  {path:"profileUser", component:ProfileUserComponent},
  {path:"clients", component:ClientComponent},
  {path:"reservationsUser", component:ReservationsUserComponent},
  {path:"reservationsUser/:idHotel", component:ReservationsUserComponent},
  {path:"hoteslGrapfic", component: HotelGraphicComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
