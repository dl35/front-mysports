import { TypeActivite } from './../interfaces/activite';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription, switchMap } from 'rxjs';
import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Guest } from '../interfaces/guest';

import { MatCheckboxChange } from '@angular/material/checkbox';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {


  @ViewChild(CdkVirtualScrollViewport)
  viewPort!: CdkVirtualScrollViewport;

  total$ = new BehaviorSubject<number>(0);
  ds!: GuestDataSource;
  loading$ = new Subject<boolean>();

  filter = { search: '' , type: [ "BIKE" , "SWIM" , "RUN" ] }

  searchControl!: FormControl;
  
  constructor( private userService: UsersService  ) { 

 


  }

  ngOnInit(): void {
    this.ds = new GuestDataSource( this.loading$ ,  this.total$ , this.userService );
  
    this.searchControl = new FormControl('');
    this.searchControl.valueChanges
      .pipe(
     //  startWith(''), 
       debounceTime( 100 ),
       distinctUntilChanged(),
      ).subscribe( v => {
        this.filter.search = v ;
        this.refresh();
      } )


  }




  setType( $event: MatCheckboxChange){

    if(!$event.checked && this.filter.type.length == 1 ) {
      $event.source.checked= true ;
      return;
    } 
    const v =  $event.source.value ;
   ( !$event.checked ) ?  this.filter.type =  this.filter.type.filter(item => item != v ) : this.filter.type.push(v)  

      this.refresh();
  }

  refresh() { 
  this.viewPort.scrollToIndex(0);
  this.ds.refreshData( this.filter  );
  }

  getType(type: string ){

      switch( type ) {

         case TypeActivite.BIKE: 
         return "Cyclisme";

         case TypeActivite.RUN: 
         return "Course à pied";

         case TypeActivite.SWIM: 
         return "Natation";

         default:
           return "";

      }

  


  }



}
export class GuestDataSource extends DataSource<any | undefined> {
  //  private length = 100000;
    private pageSize = 18;
    private cachedData: Guest[] = [];
    
    private dataStream =  new BehaviorSubject<(Guest)[]>([]);
    private subscription = new Subscription();

    private page = 2 ;
    private lastPage = 0;
   
    private filter: any ;
  
    constructor(private loading$: Subject<boolean> ,private total$: BehaviorSubject<number>, private userService: UsersService  ) {
      super();
     
      this.getdatas( true  );
    }



    connect(collectionViewer: CollectionViewer): Observable<(Guest)[]> {
      
      
      this.subscription.add(collectionViewer.viewChange.subscribe(range => {
        const currentPage = this.getPageForIndex(range.end);

        console.log('range ' , range  , 'last = ' ,this.lastPage )

         if ( currentPage > this.lastPage) {
          this.lastPage = currentPage;
          this.getdatas( false );
        } 

        

      }));

      return this.dataStream;
    }

 

    getdatas(started: boolean ): void {
      let p =1;

      if( !started ) {

          p = this.page ;
      }
      
        const query = this.makeQuery();
    
      console.log( 'getdatas page => ' , this.page )
      this.loading$.next( true );
      this.userService.getGuest(  p , query  ).subscribe(
        (v) => {
          console.log(this.page ,  v , "size "+ this.cachedData.length );
          this.cachedData = this.cachedData.concat( v );
          const n = this.total$.getValue() + v.length;
          this.total$.next( n );
          this.dataStream.next(this.cachedData);
          if( ! started ) {
            this.page = p + 1 ;
          }
          setTimeout(() =>  this.loading$.next( false ) , 500);
        
          console.log( 'page updated  => ' , this.page )
        });
    }


    makeQuery(  ) {
      let q = '';
      if ( this.filter?.search ) {
        q="?search="+ this.filter.search;
      } 
      if ( this.filter?.type.length > 0 && this.filter.type.length != 3 ) {
        for (var v of this.filter.type ) {
          ( q == '' ) ?  q+="?type[]="+v : q+="&type[]="+v
        }
      }
        return q;
    }

    
    refreshData( filter: any ): void {

      this.filter = filter ;
      this.page = 1 ;
      this.lastPage = 0 ;
      this.total$.next(0);
   

     
      this.cachedData = [];
      this.getdatas( true  );

    }

    



    disconnect(): void {
      this.subscription.unsubscribe();
      //this.total$.unsubscribe();
      console.log( "destroy ")
    }

    private getPageForIndex(index: number): number {
      return Math.floor(index / this.pageSize);
    }

  }
