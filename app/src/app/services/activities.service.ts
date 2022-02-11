import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  url = '/activite' ;

  constructor(private http: HttpClient ) {


    


  }

  // pour type user
  get(id:number, page:number, size: number) {

    if ( id == -1 ) {
      const u = this.url +'?page='+page+"&size="+size;
      console.log (u );
      return this.http.get<any>( u ) ;
    } else {
      return this.getFromId(id , page, size) ;
    }
   
  }

  // pour type admin
  getFromId(id:number , page:number, size: number) {
    const u = this.url  +'/from/'+id +"?page="+page+"&size="+size;
    console.log (u );
    return this.http.get<any>( u ) ;
  }



}
