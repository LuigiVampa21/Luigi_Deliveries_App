import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
      return this.authService.checkAuth().then(response => {
       if(response) {
        return true;
      }
       this.navigate();
       return false;
      })
      .catch(err => {
       this.navigate();
       return false;
      });
 }

 navigate() {
   this.router.navigateByUrl('/auth-screen', {replaceUrl: true});
 }

}
