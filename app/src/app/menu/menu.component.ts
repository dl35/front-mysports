import { MessageService } from './../services/message.service';
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

  
 
  profile = "ADMIN" ;


  constructor(private router: Router, private messerv : MessageService) {

        console.log(  this.router.url  );

    /*
    if ( router.url === '/' )  {

        this.router.navigate(['/logo'], {  skipLocationChange: true});
    }*/
    const token = sessionStorage.getItem('token') ;
    if ( token ) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      this.profile = decodedToken.role ;
    }



  }

 ngOnInit(): void {

    /*
    this.messerv.sendMessage("ok....");
    this.messerv.getMessages().subscribe( v  =>  console.log( v) ) 
    */

 }
  

  
  



}


