import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceFancy } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardFancy implements CanActivate {
  constructor(private authService: AuthServiceFancy, private router: Router) {}

  canActivate() {
      if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    console.log(this.router.navigate(['login']));

    return false;
  }
}
