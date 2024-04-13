import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private tokenService :TokenService
    ) { }

    async isLoggedIn() {
        const userId = this.storageService.getUserId();
        if (userId == null || userId == "") {
            return false
        }

        if(this.tokenService.isAccessTokenActive()){
            return true
        }
        else {
           return await this.tokenService.refreshToken()
        }
    }

    logout() {
        this.storageService.removeAllTokens()
        this.router.navigate(['login'])
    }
}
