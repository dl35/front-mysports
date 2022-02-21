import { EditComponent } from './activities/edit/edit.component';
import { mySocket } from './services/mySocket';
import { LOCALE_ID, NgModule } from '@angular/core';
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
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';
import { KmsPipe } from './pipes/kmsPipe';
import localeFr from '@angular/common/locales/fr';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import 'moment/locale/fr';
import { TuserComponent } from './tuser/tuser.component';
import { GuestComponent } from './guest/guest.component';
// import { registerLocaleData } from '@angular/common';
// registerLocaleData(localeFr);


export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ActivitiesComponent,
    EditComponent,
    MenuComponent,
    ProfileComponent,
    ChartComponent,
    DialogConfirmComponent,
    KmsPipe,
    TuserComponent,
    GuestComponent
    
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
  providers: [mySocket , 
    { provide: MAT_DATE_LOCALE, useValue: "fr-FR" },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: HTTP_INTERCEPTORS, useClass: MyHttpInterceptor, multi: true }
       
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
