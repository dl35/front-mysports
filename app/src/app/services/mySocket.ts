import { Injectable, NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class mySocket extends Socket {

//  override config: SocketIoConfig = { url: 'http://localhost:4200', options: {transports: ["polling"] ,path: "/" , }  };  
  constructor() {
   
    super(  { url: 'http://localhost:4200', options: { } } )
         
   
    
  }
}


