import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
    ReservationServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    NavBarLoginRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
