import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = '/auth/signin' ;

  constructor(private http: HttpClient) {
  }

  signin( value: any ) {
    console.log( value );
    return this.http.post<any>( this.url  , value) ;
  }

  signout() {
     sessionStorage.clear();
  }

 checkCredentials() {
  if (sessionStorage.getItem('token') === null) {
    return false;
  } else {
    return true;
  }


}
    isAdmin() {
      const token = sessionStorage.getItem('token') ;
      if ( token ) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const role = decodedToken.role ;
        return role == "ADMIN" ;
      } else return false;

    }



}