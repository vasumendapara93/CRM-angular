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

  Userlogin(email: string, password: string) : Observable<any> {
      return this.httpClient.post(this.APIorigin + '/api/user/login', { email: email, password: password }).pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
