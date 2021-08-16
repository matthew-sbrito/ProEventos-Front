import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
 } from '@angular/router';

import { UserService } from '@app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: UserService){}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = window.localStorage.getItem('token');
    if(token){
      return new Promise((resolve, reject) => {
        this.userService.getUserByToken(token).subscribe(
          (user) => {
            resolve(true);
          },
          (error) => {
            this.router.navigate(['/login']);
            resolve(false);
          },
          () => {},
        )});
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }

}
