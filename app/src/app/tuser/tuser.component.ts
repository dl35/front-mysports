import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, startWith, debounceTime, distinctUntilChanged, map, merge, switchMap, combineLatest, tap, Subject } from 'rxjs';
import { User } from '../interfaces/user';
import { UserPage, Paginate } from '../interfaces/user-page';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-tuser',
  templateUrl: './tuser.component.html',
  styleUrls: ['./tuser.component.css']
})
export class TuserComponent implements OnInit {

  searchControl!: FormControl;
  pager$: BehaviorSubject<boolean> ;
  userSelected: User | undefined;

  pagedata!: UserPage;
  page:number = 1;
   
  constructor( private userService: UsersService  ) {
    this.pager$ = new BehaviorSubject<boolean>( true );
  }


  ngOnInit(): void {
     this.searchControl = new FormControl('');
     const search : Observable<string> = this.searchControl.valueChanges
       .pipe(
        startWith(''), 
        debounceTime( 300 ),
        distinctUntilChanged(),
        map( (v) => { return v.trim() }  )
        )

      combineLatest( [ this.pager$ , search ]  ).pipe(
        switchMap( ( [v1 , v2] )  => {  return this.userService.getAll_v2( this.page , v2  )  }  ),
      ).subscribe( (value)  => this.pagedata = value   );
      


  }

  topage(page : number ) {
       if ( page == 0 ) {
         this.page = 1 ; 
       } else if  ( page == 1 ||  page == -1  ) {
         this.page = this.page + page ;
       } else {
         this.page = page;
       }
       this.pager$.next( true );
   }


  edit(item: User){
    this.userSelected = item ;
  }

  quitteEdit(user: User ){
    if( user ) {
      const index = this.pagedata.datas.findIndex( ( item) => item.id == user.id   )
      this.pagedata.datas[index] = user ;
    }
    this.userSelected = undefined ;
  }


}

