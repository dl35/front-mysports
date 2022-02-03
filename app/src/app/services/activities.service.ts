import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  url = '/activite' ;

  constructor(private http: HttpClient) {
  }

  get() {
    const u = this.url +'?page=1';
    return this.http.get<any>( u ) ;
  }





}
