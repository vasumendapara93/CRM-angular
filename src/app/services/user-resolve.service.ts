import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserResolveService {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var userId = this.storageService.getUserId()
    if (userId == null) {
      this.router.navigate(['login'])
    }
    return await this.authService.getUser(userId!)
  }
}
