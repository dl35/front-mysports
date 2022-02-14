import { DialogConfirmComponent } from './../dialog-confirm/dialog-confirm.component';
import { BehaviorSubject, debounceTime, distinctUntilChanged, map, merge, Observable, of, startWith, switchMap, tap } from 'rxjs';
import { ActivitiesService } from './../services/activities.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Activite } from '../interfaces/activite';
import { CollectionViewer } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { NumberInput } from '@angular/cdk/coercion';
import { FormControl } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { User } from '../interfaces/user';
import { LoginService } from '../services/login.service';
import { UserComplete } from '../interfaces/user-complete';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {

 
  searchControl!: FormControl;
  length!: number;
  pageIndex = 1;
  pageSize = 15;
  pageOptions = [5, 15, 25 ] ;

 // filter = {updated: false, day: undefined,  media: undefined, etat: undefined, accuse: undefined, search: [] };
  // tslint:disable-next-line:max-line-length
  displayedColumns: string[] = ['date', 'type', 'dist', 'desc','id','delete'];
  dateDisplayed = [];
 // date = new Date().toISOString();
  
 

  // date = new Date().toISOString();
  dataSource!: ActiviteDataSource;
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;

  isLoadingResults = true;
  /*
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;*/

  isSearch= false;
  userSelected!: User | undefined ;
  textUser = "Mes activités";

  isAdmin = false;
  search$!: Observable<UserComplete[]> ;

  showEdit = false;
  activiteSelected!: Activite | undefined ;
  //readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(public dialog: MatDialog, private actserv: ActivitiesService,  private userService: UsersService , private loginServ: LoginService) { 

        this.isAdmin = this.loginServ.isAdmin();
        //  this.isAdmin = false;
  } 




  ngOnInit() {

    this.searchControl = new FormControl('');
    this.search$ = this.searchControl.valueChanges
      .pipe(
     //  startWith(''), 
       debounceTime( 100 ),
       distinctUntilChanged(),
       switchMap( (item: string)  =>  {
         item = item.trim();
         if( item == "" ) {
           return of([]);
         }
        //const p  = { search: item , page: 1}
        return this.userService.complete( item );
  }
           )
      )



    this.dataSource = new ActiviteDataSource();
    this.loadData(false);

  }

/*
  remove(item: Activite ): void {
    const index = this.filter.search.indexOf(item);
    if (index >= 0) {
      this.filter.search.splice(index, 1);
    }
    this.loadData(true, false);
  }
*/

  autocomplete() {

      this.isSearch = ! this.isSearch ;
       this.searchControl.setValue('');

  }

  refreshUser(value: User  | false ) {
      this.isSearch = false;
      if ( !value ) {
        this.userSelected = undefined ;
        this.textUser ="Mes Activités ";
      } else {
        this.userSelected = value ;
        this.textUser ="Activités de "+ this.userSelected.prenom+" "+this.userSelected.nom;
      }
      this.loadData( true ); 
  }



  displayProperty( u: User) {
    return u && u.nom  ? u.prenom +" "+u.nom : '';
  }

  PaginationChange(event: { pageIndex: number; pageSize: number; }) {
    this.pageIndex = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData(false );
  }


  toQuitte(item: Activite | false ){

      if( item == false ) {
         this.activiteSelected = undefined ;
         this.showEdit = false ;
         return;
      }
    
    const act = item as Activite ;  
  
    // mode update
    if( this.activiteSelected  )  {
  
      this.actserv.update( act ).subscribe( 
        () => { this.updateItem( act );
          this.activiteSelected = undefined ;
          this.showEdit = false ;
        }
      )


    }  else { 
      // mode ajout
     
      if ( this.userSelected ) {

        const id = this.userSelected.id  as number ;
        act.userId = id;
        this.actserv.addtoid( id , act ).subscribe(
          () =>  { this.loadData( true ) 
                   this.activiteSelected = undefined ;
                   this.showEdit = false ;
                 }
        );
      } else {

        this.actserv.add(  act ).subscribe( 
            () => { this.loadData( true );
                    this.activiteSelected = undefined ;
                    this.showEdit = false ;
                  }

        );
      }

     

    }

  


  }






  openAdd(){
        this.activiteSelected = undefined ;
        this.showEdit = true ;
  }

  openUpdate( item: Activite ){
    
    this.activiteSelected = item ;
    this.showEdit = true ;

/*
    this.actserv.update( item ).subscribe( 
      () => { this.upadteItem( item );
        this.activiteSelected = undefined ;
        this.showEdit = false ;
      }
    )  
*/

   
  }

  openDelete( item: Activite ){
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '50%',
      data: { id: item.id , info: 'Voulez vous supprimer cette activité ?'  },
      disableClose: true
     });
  
     dialogRef.beforeClosed().pipe(
        switchMap(  (m: boolean) => 
                {
                  return ( m) ? this.actserv.delete( item.id ) :  of( false )
                } )
  
        ).subscribe(( res ) => {
                 if ( res != false  ) 
                    this.removeItem( item.id) ;
                });
    
    }


  private removeItem( id: number  ) {
    const d = [...this.dataSource.datas]  ;
    this.dataSource.datas =  d.filter( item => item.id !== id);
  }

  private updateItem( act: Activite  ) {
    const d = [...this.dataSource.datas]  ;
    const index  =  d.findIndex( item => item.id == act.id );
    d[index] = act;
    this.dataSource.datas = d;



  }



  /*
  initData() {
    Object.keys(this.filter).forEach(key => {
      this.filter[key] = undefined ;
    });
    this.filter.search = [];
    this.loadData( true, false ) ;
  }

*/


  loadData(reset:boolean) {
    if (reset) {
      this.pageIndex = 1;
      this.paginator.firstPage();
    }
    this.isLoadingResults = true;
   // this.filter.updated = updated ;

     let id = -1 ; 
     if (this.userSelected && this.userSelected.id ) {

        id = this.userSelected.id ; 

     }


    this.actserv.get(id , this.pageIndex, this.pageSize ).subscribe(
      (v: { total: NumberInput; datas: Activite[]; }) => {
            this.paginator.length = v.total;
            this.dataSource.datas = v.datas;
            this.isLoadingResults = false;
      },
      (err: any) => {
            this.paginator.length = 0;
            this.dataSource.datas = [];
            this.isLoadingResults = false;
    }


    );

  }





}

export class ActiviteDataSource extends DataSource<Activite[]> {

  private readonly datasChange$ = new BehaviorSubject<Activite[]>([]);
  get datas(): Activite[] { return this.datasChange$.value; }
  set datas(data: Activite[]) { this.datasChange$.next(data); }



  constructor() {
    super();
  }




  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    const displayDataChanges = [
      this.datasChange$,
    ];


    return merge(...displayDataChanges);


  }



  disconnect() {
    // this.dataChange$.complete();
  }

}

