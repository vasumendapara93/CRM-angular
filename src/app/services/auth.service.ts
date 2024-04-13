import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { APIService } from './api.service';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private apiService: APIService,
        private storageService: StorageService
    ) { }

    async isLoggedIn() {
        const userId = this.storageService.getUserId();
        if (userId == null || userId == "") {
            return false
        }
        const accessToken = this.storageService.getAccessToken();
        if (accessToken == null || accessToken == "") {
            return false
        }
        const payload = atob(accessToken.split('.')[1]);
        const parsedPayload = JSON.parse(payload);
        if (parsedPayload.exp > Date.now() / 1000) {
            return true
        }
        else {
            const refreshToken = this.storageService.getRefreshToken();
            if (refreshToken == null || refreshToken == "") {
                return false
            }
            try {
                var response = await this.apiService.refreshToken(accessToken, refreshToken)
                console.log(response)
                if (response.data) {
                    await this.storageService.setRefreshedAccessToken(response.data.accessToken, response.data.refreshToken)
                    return true
                } else {
                    return false
                }
            } catch (e) {
                console.log(e)
                return false
            }
        }
    }

    logout() {
        this.storageService.removeAllTokens()
        this.router.navigate(['login'])
    }
}
