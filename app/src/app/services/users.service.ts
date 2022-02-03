import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = '/user' ;

  constructor(private http: HttpClient) {
  }

  get() {
    
    

    return this.http.get<any>( this.url ) ;
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