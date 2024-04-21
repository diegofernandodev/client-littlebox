import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SignInUpService } from '../services/sign-in-up.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: SignInUpService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const allowedRoles = route.data['allowedRoles'] as Array<string>;

    const userRole = this.authService.getUserRole();
    
    if (userRole && allowedRoles.includes(userRole)) {
      return true;
    } else {
      return this.router.parseUrl('/unauthorized');
    }
  }
}
