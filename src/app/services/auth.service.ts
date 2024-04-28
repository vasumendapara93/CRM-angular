import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { TokenService } from './token.service';
import { APIService } from './api.service';
import { API } from 'src/assets/static/API';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import IUser from '../model/User.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private router: Router,
        private storageService: StorageService,
        private tokenService: TokenService,
        private apiServices: APIService
    ) { }

    user : IUser | undefined

    userlogin(email: string, password: string): Observable<any> {
        return this.apiServices.post(API.LOGIN, { email: email, password: password })
    }

    sendOTP(email: string): Observable<any> {
        return this.apiServices.post(API.SEND_OTP, null, {
            params: {
                email: email
            }
        })
    }

    verifyOTP(email: string, OTP: string): Observable<any> {
        return this.apiServices.post(API.VERIFY_OTP, {
            email: email,
            OTP: OTP
        })
    }

    changePassword(email: string, newPassword: string): Observable<any> {
        return this.apiServices.post(API.CHANGE_PASSWORD, {
            email: email,
            newPassword: newPassword
        })
    }

    async refreshToken(accessToken: string, refreshToken: string): Promise<any> {
        return await this.apiServices.post(API.REFRESH_TOKEN, {
            accessToken: accessToken,
            refreshToken: refreshToken
        }).toPromise()
    }


    async getAuthorizationHeader() {
        if (await this.isLoggedIn()) {
            var token = this.storageService.getAccessToken()
            if (token != null) {
                return new HttpHeaders().set(
                    "Authorization", `Bearer ${token}`!
                )
            }
        }
        this.router.navigate(["login"])
        return new HttpHeaders()
    }

    async getUser(userId: string): Promise<any> {
        try {
            var response =  await this.apiServices.get(API.GET_USER, {
                params: {
                    userId: userId
                },
                headers: await this.getAuthorizationHeader()
            }).toPromise()
            if(response.data){
                return response.data
            }else{
                console.log("somthing wrong")
            }
        }
        catch (e) {
           console.log(e)
           this.router.navigate(['login'])
        }
    }

    async isLoggedIn() {
        const userId = this.storageService.getUserId();
        if (userId == null || userId == "") {
            return false
        }

        if (this.tokenService.isAccessTokenActive()) {
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
