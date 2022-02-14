import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activite } from '../interfaces/activite';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  url = '/activite' ;

  constructor(private http: HttpClient ) {}


  // pour type user
  get(id:number, page:number, size: number) {

    if ( id == -1 ) {
      const u = this.url +'?page='+page+"&size="+size;
      return this.http.get<any>( u ) ;
    } else {
      return this.getFromId(id , page, size) ;
    }
   
  }

  // pour type admin
  getFromId(id:number , page:number, size: number) {
    const u = this.url  +'/from/'+id +"?page="+page+"&size="+size;
    return this.http.get<any>( u ) ;
  }


  delete( id: number ){
    const u = this.url  +'/'+id
    return this.http.delete( u )
  }

  update(  act: Activite ){
    const u = this.url  +'/'+ act.id ;
    return this.http.put( u , act )
  }

  add( act: Activite ){
    return this.http.post( this.url , act )
  }

  addtoid(id: number , act: Activite ) {
    const u = this.url  +'/'+ id ;
    return this.http.post( u , act )
  }



}
