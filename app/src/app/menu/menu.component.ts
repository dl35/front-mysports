import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {


  selected = 0;
  profile = '';

  constructor(private router: Router) {

    if ( router.url === '/' )  {

        this.router.navigate(['/logo'], {  skipLocationChange: true});
    }
    const token = sessionStorage.getItem('token') ;
    if ( token ) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.profile = decodedToken.profile ;
    }


  }

 ngOnInit(): void {
 }
 
 change(n: number) {
    this.selected = n;
}


}
