import { UsersComponent } from './users/users.component';
import { ActivitiesComponent } from './activities/activities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MyGuard } from './guard/my.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';
import { TuserComponent } from './tuser/tuser.component';
import { GuestComponent } from './guest/guest.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'guest', component: GuestComponent },
 
  {
    path: '', component: MenuComponent,   canActivate: [MyGuard], canActivateChild: [MyGuard], children:
    [
  
    { path: 'user', component:UsersComponent },
    { path: 'tuser', component:TuserComponent },
    { path: 'activite', component: ActivitiesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'graphique', component: ChartComponent },
    { path: '', redirectTo: '/activite' , pathMatch: 'full'},
    { path: '**', redirectTo: '/activite' , pathMatch: 'full'},
    ]
  },
  
  { path: '**', component: LoginComponent } ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
