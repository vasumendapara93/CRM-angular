import { Injectable } from '@angular/core';
import IUser from '../model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_STORAGE_KEY : string = 'CurrentUser'
  isAuthenticated : boolean

  constructor(){
    this.isAuthenticated = Boolean(this.getToken())
  }

  setToken(token : string, user : IUser){
    localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify({'token' : token, 'user' : user}))
  }

  getToken(){
    localStorage.getItem(this.TOKEN_STORAGE_KEY)
  }

  removeToken(){
    localStorage.removeItem(this.TOKEN_STORAGE_KEY)
  }
}
