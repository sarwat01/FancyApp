import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthServiceFancy } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RandomGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthServiceFancy, private router: Router) { }

  canActivate() {
      return this.canLoad();
  }
  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['../../mobile/balance']);
    }
    return this.authService.isLoggedIn();
  }
}
