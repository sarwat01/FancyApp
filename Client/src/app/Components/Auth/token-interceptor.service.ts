import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './services/auth.service'; 
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(public authService: AuthService,private toastService:ToastrService) { }
 


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
   
    if(request.url.split('/')[2] == 'fcm.googleapis.com'){ 
      
    }
    if(request.url.split('/')[2] != 'fcm.googleapis.com'){ 
      request = this.addToken(request, this.authService.getJwtToken());  
  
    }
     
   
  return next.handle(request).pipe(catchError(error => {
       const route = error.url.split('/')[error.url.split('/').length - 1];
      if (error instanceof HttpErrorResponse && error.status === 401 && route!=='login') {
        return this.handle401Error(request, next);
      } else {
         let arr=error.error.message.replaceAll('"','?').split('?');
        arr=arr.filter(item=>item!=="")
         console.log(error.error.error);
         return throwError(error.message);
      }
    }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  private addTokenFancy(request: HttpRequest<any>, token: string) {
     return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }


  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(token);
          return next.handle(this.addToken(request, token.token));
        }));

    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt.token));
        }));
    }
  }
}
