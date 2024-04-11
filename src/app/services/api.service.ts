import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private httpClient: HttpClient
  ) { }

  private readonly APIorigin: string = "https://r1dq4k84-7246.inc1.devtunnels.ms"
  private readonly loginAPI: string = this.APIorigin + '/api/user/login'
  private readonly sendOTPAPI: string = this.APIorigin + '/api/otp/send'
  private readonly verifyOTPAPI: string = this.APIorigin + '/api/otp/verify'

  userlogin(email: string, password: string): Observable<any> {
    return this.httpClient.post(this.loginAPI, { email: email, password: password }).pipe(catchError(this.handleError))
  }

  sendOTP(email: string): Observable<any> {
    return this.httpClient.post(this.sendOTPAPI, null, {
      params : {
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

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
