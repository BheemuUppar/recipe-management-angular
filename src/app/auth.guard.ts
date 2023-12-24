import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router:  Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):any {
   
      if(localStorage.getItem('currentUser')){
        return true;
      }
      else{
        alert('User not Logged In!,  Please Login to continue');
        this.router.navigateByUrl('/login')
      }
  }
  
}
