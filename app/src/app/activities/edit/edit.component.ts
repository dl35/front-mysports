import { ActivitiesService } from './../../services/activities.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activite } from 'src/app/interfaces/activite';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import 'moment/locale/fr';
import { User } from 'src/app/interfaces/user';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EditComponent implements OnInit {
  

  @Output()
  quitteEvent = new EventEmitter<boolean>();

  @Input()
  item!: Activite | undefined ;

  @Input()
  user!: User | undefined ;
  


  dataForm!: FormGroup;
  constructor( private formBuilder: FormBuilder,private actService: ActivitiesService ,  private router: Router  ) {
    
  }
  ngOnInit(): void {


    if( this.item ) {
      this.initForm( this.item )  ;
    }  else {
      this.initForm( false )  ;
    }


  }


initForm( item: Activite | false) {
  const df = this.formBuilder.group({
    // tslint:disable-next-line:max-line-length
    date: [ '', [Validators.required] ],
    type: [ '', [Validators.required] ],
    dist: [ '', [Validators.required] ],
    desc: [ '', [] ]
    
                                      });
    if( item == false )  {
      this.dataForm = df ;
    } else {
      df.patchValue( item ) ;     
      this.dataForm = df ; 
    }
                                      
                                      

}

quitte() {
  this.quitteEvent.emit(true);
}
doSave() {
/*
  if( this.itemUser ) {

   if( !this.itemUser.id ) {
     return ;
   }

   this.userService.put( this.itemUser.id , this.dataForm.value).subscribe(
     (res) => {
       const u = this.dataForm.value  as User ;
       
       this.quitte( u ); 
      })



  }  else {

   this.userService.putProfile(this.dataForm.value).subscribe(
     (res) => {  this.router.navigate(['/activite']) ;  }
    )
   


  }

*/

 }








}
