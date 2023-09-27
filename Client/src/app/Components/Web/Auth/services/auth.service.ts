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
export class AuthServiceFancy {
  private readonly JWT_TOKEN_Fancy = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN_Fancy = 'REFRESH_TOKEN';
  private readonly translocoLang_Fancy = 'translocoLang';
  private loggedUser: string;

  constructor(private http: HttpClient, private tostService: ToastrService) {}

  login(payload: any): Observable<boolean> {
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
          console.log(this.storeJwtToken(token));
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN_Fancy);
  }

  private doLoginUser(token: any) {
    this.storeTokens(token);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    let value = localStorage.getItem(this.REFRESH_TOKEN_Fancy);
    return value;
  }

  private UserInfo() {
    let value = localStorage.getItem(this.loggedUser);
    return value;
  }

  private storeJwtToken(jwt: any) {
    localStorage.setItem(this.JWT_TOKEN_Fancy, jwt.token);
    localStorage.setItem(this.REFRESH_TOKEN_Fancy, jwt.token);
  }
  private storeTokens(data: any) {
    localStorage.setItem(this.JWT_TOKEN_Fancy, data.token);
    localStorage.setItem(this.REFRESH_TOKEN_Fancy, data.token);
  }

  removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN_Fancy);
    localStorage.removeItem(this.REFRESH_TOKEN_Fancy);
    localStorage.removeItem(this.translocoLang_Fancy);
  }
}
