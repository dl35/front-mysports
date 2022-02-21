import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
 

    constructor(private router: Router, private snackBar: MatSnackBar) {

    }

 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  let handled: boolean = false;
  const token: string | null = sessionStorage.getItem('token');
  if (token) {
    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
     }
  request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
 /* return next.handle(request).pipe( tap ({
     next: (v) => { } ,
     error: (e) => {
       if ( e instanceof HttpErrorResponse ) {

      

         const status =  (e.status) ? '' + e.status : '500' ;
         const message = (e.statusText ) ? e.statusText : 'error interne ' ;
         this.snackBar.open(message, status, {
            duration: 2000,
          });
       }

       if ( e.status !== 500 ) {
         this.router.navigate(['login']);
       }
      }

    })

  );


   }*/
   return next.handle(request)
    .pipe(

      catchError( (e :HttpErrorResponse )   => {
           
          return this.handleServerSideError(e);
      
      }
      ))
      }


      private handleServerSideError(e: HttpErrorResponse): Observable<any> {
       
    
        const message = (e.statusText ) ? e.statusText : 'error interne ' ;
        const status = e.status;
        this.snackBar.open(message, ""+status, {
          duration: 2000,
        });


        switch ( status) {
          case 401:
            this.router.navigate(['login']);
            break;
          case 403:
            this.router.navigate(['login']);
            break;
        }
    
        return throwError(() => e);
      }


}