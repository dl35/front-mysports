import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateInputsHaveChanged } from '@angular/material/datepicker/datepicker-input-base';
import { Activite } from 'src/app/interfaces/activite';

import { User } from 'src/app/interfaces/user';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],

})
export class EditComponent implements OnInit {
  

  @Output()
  quitteEvent = new EventEmitter<Activite|false>();

  @Input()
  item!: Activite | undefined ;

  @Input()
  user!: User | undefined ;
  
  distSuffix = "";
  dist_error = "";

  dataForm!: FormGroup;
  maxDate = new Date();
  
  constructor( private formBuilder: FormBuilder ) {
    
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
    id: [ '' ],
    date: [ '', [Validators.required] ],
    type: [ '', [Validators.required] ],
    dist: [ '', [Validators.required] ],
    desc: [ '', [] ]
    
                                      });
   
                                      
    df.get('type')?.valueChanges.subscribe( t => {

      switch( t ) {
        case "BIKE": {
          df.get('dist')?.setValidators([Validators.required, Validators.min(25) , Validators.max(500)  ]);
          this.distSuffix = "kms";
          this.dist_error = "distance entre 25 et 500 kms";
          break;
        }
        case "SWIM": {
          df.get('dist')?.setValidators([Validators.required, Validators.min(500) , Validators.max(25000) ]);
          this.dist_error = "distance entre 500 et 25000 m";
          this.distSuffix = "m";
          break;
        }
        case "RUN": {
          df.get('dist')?.setValidators([Validators.required, Validators.min(5) , Validators.max(300) ]);
          this.dist_error = "distance entre 5 et 300 kms";
          this.distSuffix = "kms";
          break;
        }

      }

      df.get('dist')?.setValue('');
      df.get('dist')?.updateValueAndValidity();
    }); 
    
    if( item == false )  {
      // mode ajout
      df.removeControl('id');
      this.dataForm = df ;
    } else {

       if ( item.type != "SWIM" &&  item.dist > 1000 ) {
            item.dist =item.dist /1000 ;
       }
      df.patchValue( item ) ;  
      //df.get('dist')?.updateValueAndValidity();   
      this.dataForm = df ; 
    }


}

quitte() {
  this.quitteEvent.emit(false);
}

doSave() {
  const a = this.dataForm.value  as Activite ;
  if (  a.type == 'BIKE'  ||  a.type  == 'RUN' ) {
    const v = a.dist * 1000 ;
    a.dist = v ;
   }
  this.quitteEvent.emit( a );
 }




}
