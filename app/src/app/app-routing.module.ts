import { UsersComponent } from './users/users.component';
import { ActivitiesComponent } from './activities/activities.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { MyGuard } from './guard/my.guard';
import { ProfileComponent } from './profile/profile.component';
import { ChartComponent } from './chart/chart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
 
  {
    path: '', component: MenuComponent,   canActivate: [MyGuard], canActivateChild: [MyGuard], children:
    [
  
    { path: 'user', component:UsersComponent },
    { path: 'activite', component: ActivitiesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'graphique', component: ChartComponent },
    { path: '', component: ActivitiesComponent },
  
    ]
  },
  
  { path: '**', component: LoginComponent } ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
