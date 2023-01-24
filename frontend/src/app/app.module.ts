import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbAccordionModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { FacultyComponent } from './faculty/faculty.component';
import { BuildingComponent } from './building/building.component';
import {CookieService} from "ngx-cookie-service";
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { NavbarComponent } from './utils/navbar/navbar.component';
import { CreateFacultyComponent } from './utils/offcanvas/create-faculty/create-faculty.component';
import { CreateBuildingComponent } from './utils/offcanvas/create-building/create-building.component';
import { CreateRoomComponent } from './utils/offcanvas/create-room/create-room.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    FacultyComponent,
    BuildingComponent,
    SpinnerComponent,
    NavbarComponent,
    CreateFacultyComponent,
    CreateBuildingComponent,
    CreateRoomComponent
  ],
  imports: [
    NgbModule,
    NgbAccordionModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
