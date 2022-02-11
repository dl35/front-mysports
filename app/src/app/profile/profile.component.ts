import { ProfileDto } from './../interfaces/profile-dto';
import { UsersService } from './../services/users.service';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public dataForm!: FormGroup;

  @Input()
  itemUser!: User | undefined;

  @Output() sendUser  = new EventEmitter<User>();


  constructor( private formBuilder: FormBuilder,private userService: UsersService ,  private router: Router  ) {
    
  }

  ngOnInit(): void {

      if( this.itemUser ) {
           this.initForm( this.itemUser )  
      } else { 
    this.userService.getProfile().subscribe(
          ( u) => { this.initForm( u ) ;
                  }
        );
      }

   



    }


  initForm(user: User) {
    const df = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      nom: [ '', [Validators.required,  Validators.minLength(4)] ],
      prenom: [ '', [Validators.required,  Validators.minLength(4)] ],
      adresse: [ '', [Validators.required,  Validators.minLength(4)] ],
      ville: [ '', [Validators.required,  Validators.minLength(4)] ],
      cp: [ '', [Validators.required,  Validators.minLength(4)] ],
      email: [ ''  , [Validators.required , Validators.email  ] ]  ,
      passwd: [ '', [Validators.required,  Validators.minLength(4)] ]

                                        });

                                        
      df.patchValue( user ) ;     
                                         
      this.dataForm = df ;                                    

  }


  doSave() {

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



    }





   quitte(u: User | undefined ) {
      this.itemUser = undefined;
      this.sendUser.emit( u );
    }
    




}
