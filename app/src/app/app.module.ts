import { EditComponent } from './activities/edit/edit.component';
import { mySocket } from './services/mySocket';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { ActivitiesComponent } from './activities/activities.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyHttpInterceptor } from './services/my-http.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { ChartComponent } from './chart/chart.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ActivitiesComponent,
    EditComponent,
    MenuComponent,
    ProfileComponent,
    ChartComponent
    
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocketIoModule
  ],
  providers: [mySocket , { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
