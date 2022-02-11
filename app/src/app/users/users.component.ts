import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, merge, Observable, startWith, switchMap } from 'rxjs';
import { User } from '../interfaces/user';
import { Paginate, UserPage } from '../interfaces/user-page';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit , AfterViewInit{
  
  searchControl!: FormControl;
  pager$!: BehaviorSubject<number>;
  search$!: Observable<string>;
  datas$!: Observable<UserPage> ;
  params: Paginate = { search:"" , page: 1  };

  itemUser: User | undefined;

  constructor( private userService: UsersService  ) {

    this.pager$ = new BehaviorSubject( this.params.page );
 

    
  }
  ngAfterViewInit(): void {
  //  throw new Error('Method not implemented.');
   // this.topage(1);
  }

  ngOnInit(): void {

   
  
     
     this.searchControl = new FormControl('');
     const search = this.searchControl.valueChanges
       .pipe(
        startWith(''), 
        debounceTime( 100 ),
        distinctUntilChanged(),
        map( (v: string)  =>  { this.params.search = v ; 
                                this.params.page = 1 ; 
                                return this.params
                              } 
            )
       )
      
      const pager = this.pager$.pipe( 
        map( (v: number)  =>  { this.params.page += v ; 
          return this.params  } 
          )
      );


      this.datas$ = merge(search , pager ).pipe(
        switchMap( (  )  => {  return this.userService.getAll(this.params )  }  )
       );


  }

  topage(page : number ) {

       if ( page == 0 ) {
         this.params.page = 1;
         this.pager$.next( 0 );
       } else if  ( page != 1 && page != -1  ) {
         this.params.page = page ;
         this.pager$.next(0);
       } else {
        this.pager$.next( page );
       }

   }

  adduser() {
    
  } 

  edit(item: User){
     
    //set user 
    this.itemUser = item ;
  }

  quitteEdit(user: User ){

    console.log(( user  ))

    if( user && this.itemUser) {
        this.itemUser.nom = user.nom;
        this.itemUser.prenom = user.prenom;
        this.itemUser.adresse = user.adresse;
        this.itemUser.ville = user.ville;
        this.itemUser.cp = user.cp;
        this.itemUser.email = user.email;
        this.itemUser.passwd = user.passwd ;

        //console.log(( this.itemUser ))
      }
    this.itemUser = undefined ;
  }


}
