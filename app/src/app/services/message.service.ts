import { Injectable } from '@angular/core';

import { map, Observable, Subscriber } from 'rxjs';
import { mySocket } from './mySocket';

@Injectable({
  providedIn: 'root'
})
export class MessageService  {
  
  
  
  constructor(private socket: mySocket) { 
  
     // this.socket.connect();
  }

  public sendMessage(message:string ) {
    console.log( "send messages to server ")
    this.socket.emit('message', message);

  }

  public getMessages(): Observable<string> {
    return new Observable((observer) => {
            this.socket.on('message', (message:any) => { 
              console.log( 'message ' , message );
                observer.next(message);
            });
    });

 


  


}


}
