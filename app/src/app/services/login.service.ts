import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = '/api/signup' ;

  constructor(private http: HttpClient) {
  }

  signup( value: any ) {
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