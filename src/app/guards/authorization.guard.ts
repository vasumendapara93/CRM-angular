import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from 'src/assets/static/UserRole';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private storageService: StorageService,) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    var userId = this.storageService.getUserId()
    if (userId == null) {
      this.router.navigate(['login'])
    }
    var user =  await this.authService.getUser(userId!)
    if(!(user.role.roleName == UserRole.ORGANIZATION || user.role.roleName ==  UserRole.DATA_ENTRY_OPRATOR)){
      this.router.navigate([''])
      return false
    }
    return true;
  }
}
