import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly translocoLang = 'translocoLang';
  private loggedUser: string;


  constructor(private http: HttpClient,private tostService :ToastrService) {}

  
  login(payload:any): Observable<boolean> {
  

  /*   const CryptoJS = require("crypto-js");
     
    const cipherText:[] = payload.payload;
     const bytes  = CryptoJS.AES.decrypt(cipherText, 'abcdefghijuklmno0123456789012345');
     const originalText = bytes.toString(CryptoJS.enc.Utf8);
console.log(originalText.toString());
 */


      return this.http.post<any>(`${environment.apiUrl}/api/index.php/api/auth/login`, payload)
    .pipe(
        tap(token => this.doLoginUser(token)),
         mapTo(false),
        catchError(error => {
          return of(false);
        }));

  }

  logout() {
    return this.http.post<any>(`${environment.apiUrl}/api/index.php/api/auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()
      ),
      catchError(error => {
        return of(error);
      }));
  }

  isLoggedIn() { 
    return !!this.getJwtToken();
    
   }

  refreshToken() {
    return this.http.post<any>(`${environment.apiUrl}/api/index.php/api/auth`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((token: Tokens) => {
      this.storeJwtToken(token);
      console.log(this.storeJwtToken(token));
      
    }));
  }

  getJwtToken() {
     
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser( token: any) {
    this.storeTokens(token);
   
    
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    let value=localStorage.getItem(this.REFRESH_TOKEN)
    return value;
  }

  private UserInfo() {
    let value=localStorage.getItem(this.loggedUser)
    return value;
  }


  private storeJwtToken(jwt: any) {
     localStorage.setItem(this.JWT_TOKEN, jwt.token);
    localStorage.setItem(this.REFRESH_TOKEN, jwt.token);
  }
 private storeTokens(data: any) {
    localStorage.setItem(this.JWT_TOKEN,data.token);
    localStorage.setItem(this.REFRESH_TOKEN, data.token);
   
  }

  removeTokens() {
    
     localStorage.removeItem(this.JWT_TOKEN);
     localStorage.removeItem(this.REFRESH_TOKEN);
     localStorage.removeItem(this.translocoLang);
  }
}
