import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private authService: AuthService
  ) { }

  private readonly APIorigin: string = "https://r1dq4k84-7246.inc1.devtunnels.ms"
  private readonly loginAPI: string = this.APIorigin + '/api/user/login'
  private readonly sendOTPAPI: string = this.APIorigin + '/api/otp/send'
  private readonly verifyOTPAPI: string = this.APIorigin + '/api/otp/verify'
  private readonly changePasswordAPI: string = this.APIorigin + '/api/user/password/change'
  private readonly REFRESH_TOKEN_API: string = this.APIorigin + '/api/token/refresh'
  private readonly GET_USER_API: string = this.APIorigin + '/api/user'


  // async getAuthorizationHeader(){
  //     var token =  this.authService.getAccessToken()
  //     if(token == null){
  //       this.router.navigate(["login"])
  //       return new HttpHeaders()
  //     }
  //     return new HttpHeaders().set(
  //       "Authorization", token!
  //     )
  // }

  userlogin(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.loginAPI, { email: email, password: password }).pipe(catchError(this.handleError))
  }

  sendOTP(email: string): Observable<any> {
    return this.httpClient.post(this.sendOTPAPI, null, {
      params: {
        email: email
      }
    }).pipe(catchError(this.handleError))
  }

  verifyOTP(email: string, OTP: string): Observable<any> {
    return this.httpClient.post(this.verifyOTPAPI, {
      email: email,
      OTP: OTP
    }).pipe(catchError(this.handleError))
  }

  changePassword(email: string, newPassword: string): Observable<any> {
    return this.httpClient.post(this.changePasswordAPI, {
      email: email,
      newPassword: newPassword
    }).pipe(catchError(this.handleError))
  }

  async refreshToken(accessToken: string, refreshToken: string): Promise<any> {
    return await this.httpClient.post(this.REFRESH_TOKEN_API, {
      accessToken: accessToken,
      refreshToken: refreshToken
    }).toPromise()
  }

  async getUser(userId: string): Promise<any> {
    try {
      return await this.httpClient.get(this.GET_USER_API, {
        params: {
          userId: userId
        }, 
        // headers : await this.getAuthorizationHeader()
      }).toPromise()
    }
    catch (e) {
      throwError(e);
    }
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
