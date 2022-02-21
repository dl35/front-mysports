import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Paginate, UserPage } from '../interfaces/user-page';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileDto } from '../interfaces/profile-dto';
import { UserComplete } from '../interfaces/user-complete';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  url = '/user' ;

  constructor(private http: HttpClient) {
  }

  getGuest(): Observable<any> {
     const u = "/guest";
     return this.http.get<any>( u ) ;
  }


  getProfile(): Observable<User> {
    const u = this.url +"/profile";
     return this.http.get<User>( u ) ;
  }

  getOne(id: number): Observable<User> {
    const u = this.url +"/"+id;
     return this.http.get<User>( u ) ;
  }

  complete(search: string): Observable<UserComplete[]> {
    let u = this.url +"/autocomplete?search="+search;
    
    return this.http.get<UserComplete[]>( u ) ;
  }

  
  getAll(p: Paginate): Observable<UserPage> {
    let u = this.url +"?page="+p.page;
    if( p.search ) {
        u +="&search="+p.search; 
    }
    return this.http.get<UserPage>( u ) ;
  }

  getAll_v2(page:number, search: string ): Observable<UserPage> {
    let u = this.url +"?page="+page;
    if( search ) {
        u +="&search="+search; 
    }
    return this.http.get<UserPage>( u ) ;
  }



  put(id: number, user: User): Observable<any> {
    const u = this.url+"/"+id ;
    return this.http.patch<any>( u  , user) ;
  }

  putProfile( user: User): Observable<any> {
    const u = this.url+"/profile" ;
    return this.http.patch<any>( u , user ) ;
  }

  post(user: User): Observable<any> {
    return this.http.post<any>( this.url , user) ;
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