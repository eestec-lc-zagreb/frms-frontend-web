import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }

}
