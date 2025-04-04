import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly translocoLang = 'translocoLang';
  private readonly userInfo = 'userInfo';
  private loggedUser: string;
  username:any
  password:any

  constructor(private http: HttpClient, private tostService: ToastrService) {}

  login(payload: any,value:any): Observable<boolean> {
    this.username = value.username
    this.password = value.password
    return this.http
      .post<any>(`${environment.apiUrl}/api/index.php/api/auth/login`, payload)
      .pipe(
        tap((token) => this.doLoginUser(token)),
        mapTo(true),
        catchError((error) => {
          return of(false);
        })
      );
  }

  loginFancy(payload: any): Observable<boolean> {
    return this.http
      .post<any>(`${environment.localserver}/api/v1/user/login`, payload)
      .pipe(
        tap((token) => this.doLoginUser(token)),
        mapTo(true),
        catchError((error) => {
          return of(false);
        })
      );
  }

  logout() {
    return this.http
      .post<any>(`${environment.apiUrl}/api/index.php/api/auth/logout`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap(() => this.doLogoutUser()),
        catchError((error) => {
          return of(error);
        })
      );
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http
      .post<any>(`${environment.apiUrl}/api/index.php/api/auth`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((token: Tokens) => {
          this.storeJwtToken(token);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  async doLoginUser(token: any) {
  
   this.storeTokens(token);
  console.log(JSON.stringify({
    type: 'login',
    username: this.username,
    password: this.password
  }));
  
  await  window.ReactNativeWebView.postMessage(JSON.stringify({
    type: 'login',
    username: this.username,
    password: this.password
  }));  
}
/*   async doLoginUser(token: any) {
  await  this.storeTokens(token); 
     window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'login',
      username: this.username,
      password: this.password
    }));  
   } */

  loginMob(value){
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'login',
      username: value.username,
      password: value.password
    }));

    
  }

   loginWeb(token){
    this.storeTokens(token);
  }
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    let value = localStorage.getItem(this.REFRESH_TOKEN);
    return value;
  }

  private UserInfo() {
    let value = localStorage.getItem(this.loggedUser);
    return value;
  }

  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN, jwt.token);
    localStorage.setItem(this.REFRESH_TOKEN, jwt.token);
  }
  private async storeTokens(data: any) {
 
    localStorage.setItem(this.JWT_TOKEN, data.token);
    localStorage.setItem(this.REFRESH_TOKEN, data.token);
 
   /*  else if(data.data.user){
      localStorage.setItem('userInfo', JSON.stringify(data.data.user));
    } */
 
 
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.translocoLang);  
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'logout',
    })); 
  }
}
