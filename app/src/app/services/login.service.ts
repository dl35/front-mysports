import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}