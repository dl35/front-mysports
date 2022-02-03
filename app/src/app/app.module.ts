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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ActivitiesComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
