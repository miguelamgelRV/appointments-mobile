import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { IonicModule } from '@ionic/angular'; 
import { IonicStorageModule } from '@ionic/storage-angular'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import { HomePage } from './home/home.page';
import { LoginComponent } from './login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    IonicStorageModule.forRoot(), 
    HttpClientModule, 
    AppRoutingModule, 
    LoginComponent, 
    AppointmentsComponent, 
  ],
  providers: [], 
  bootstrap: [AppComponent], 
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class AppModule {}