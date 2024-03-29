import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarLoginComponent } from './components/nav-bar-login/nav-bar-login.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ProfileHotelComponent } from './components/profile-hotel/profile-hotel.component';
import { UserComponent } from './components/user/user.component';
import { NavBarLoginRestService } from './services/nav-bar-login-rest.service';
import { ClientComponent } from './components/client/client.component';
import { SelectDateComponent } from './components/select-date/select-date.component';
import { ReservationRoomComponent } from './components/reservation-room/reservation-room.component';
import { ReservationServiceComponent } from './components/reservation-service/reservation-service.component';
import { ProfileUserComponent } from './components/profile-user/profile-user.component';
import { SearchHotelByNamePipe } from './pipes/search-hotel-by-name.pipe';
import { SearchHotelByDirectionPipe } from './pipes/search-hotel-by-direction.pipe';
import { HotelGraphicComponent } from './components/hotel-graphic/hotel-graphic.component';
import { ReservationsUserComponent } from './components/reservations-user/reservations-user.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { SearchUserPipe } from './pipes/search-user.pipe';
import { RoomReservationComponent } from './components/room-reservation/room-reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarLoginComponent,
    HotelsComponent,
    NavBarComponent,
    ProfileHotelComponent,
    UserComponent,
    ClientComponent,
    SelectDateComponent,
    ReservationRoomComponent,
    ReservationServiceComponent,
    ProfileUserComponent,
    SearchHotelByNamePipe,
    SearchHotelByDirectionPipe,
    HotelGraphicComponent,
    ReservationsUserComponent,
    SearchUserPipe,
    RoomReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    //Aquí se conecta ya directamente a firebase
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [
    NavBarLoginRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
