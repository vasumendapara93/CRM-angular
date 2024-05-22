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
    private httpClient: HttpClient
  ) { }

  get(url:string, options? : object | undefined): Observable<any>{
    return this.httpClient.get(url, options).pipe(catchError(this.handleError))
  }

  post(url:string, body : any, options? : object | undefined) : Observable<any>{
    return this.httpClient.post(url, body, options).pipe(catchError(this.handleError))
  }

  delete(url:string, options? : object | undefined) : Observable<any>{
    return this.httpClient.delete(url, options).pipe(catchError(this.handleError))
  }
 
  put(url:string, body : any, options? : object | undefined) : Observable<any>{
    return this.httpClient.put(url, body, options).pipe(catchError(this.handleError))
  }
  patch(url:string, body : any, options? : object | undefined) : Observable<any>{
    return this.httpClient.patch(url, body, options).pipe(catchError(this.handleError))
  }


  handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
