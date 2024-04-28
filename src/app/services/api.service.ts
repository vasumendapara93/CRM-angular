import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private httpClient: HttpClient,
    private router : Router,
    private storageService : StorageService
  ) { }

  private readonly APIorigin: string = "https://r1dq4k84-7246.inc1.devtunnels.ms"
  private readonly loginAPI: string = this.APIorigin + '/api/user/login'
  private readonly sendOTPAPI: string = this.APIorigin + '/api/otp/send'
  private readonly verifyOTPAPI: string = this.APIorigin + '/api/otp/verify'
  private readonly changePasswordAPI: string = this.APIorigin + '/api/user/password/change'
  private readonly REFRESH_TOKEN_API: string = this.APIorigin + '/api/token/refresh'
  private readonly GET_USER_API: string = this.APIorigin + '/api/user'


  

  get(url:string, options? : object | undefined): any{
    return this.httpClient.get(url, options).pipe(catchError(this.handleError))
  }

  post(url:string, body : any, options? : object | undefined) : any{
    return this.httpClient.post(url, body, options).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
