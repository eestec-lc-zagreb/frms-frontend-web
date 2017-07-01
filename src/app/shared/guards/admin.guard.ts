import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthorizationService } from '../services/authorization.service';
import { User } from '../models/user.model';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthorizationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const loggedUser: User = this.authService.getCurrentUser();

    if (this.authService.isLoggedIn()) {
      if (loggedUser.role === 'ADMIN') {
        return true;
      } else {
        this.router.navigate(['/dashboard']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
