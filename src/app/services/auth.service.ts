import { Injectable } from '@angular/core';
import IUser from '../model/User.model';
import { Router } from '@angular/router';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router : Router,
    private apiService : APIService
  ){}

  private readonly ACCESS_TOKEN_STORAGE_KEY : string = 'AccessToken'
  private readonly REFRESH_TOKEN_STORAGE_KEY : string = 'RefreshToken'
  private readonly USER_ID_STORAGE_KEY : string = 'UserID'
  // CurrentUser : IUser = localStorage.getItem(this.USER_INFO_STORAGE_KEY) ? JSON.parse(localStorage.getItem(this.USER_INFO_STORAGE_KEY)!) : null

  setToken(accessToken : string, refreshToken : string,  userId : string){
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, refreshToken)
    localStorage.setItem(this.USER_ID_STORAGE_KEY, userId)
  }

  getAccessToken(){
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY)
  }
  
  getUserId(){
    return localStorage.getItem(this.USER_ID_STORAGE_KEY)
  }

  removeAllTokens(){
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.USER_ID_STORAGE_KEY)
  }

  async isLoggedIn(){
    const userId = localStorage.getItem(this.USER_ID_STORAGE_KEY);
    console.log(userId)
    if(userId==null || userId == ""){
      return false
    }
    const accessToken = localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY); 
    if(accessToken==null || accessToken == ""){
      return false
    }
    const payload = atob(accessToken.split('.')[1]); // decode payload of token
    const parsedPayload = JSON.parse(payload); // convert payload into an Object
    if(parsedPayload.exp > Date.now() / 1000) {// check if token is expired
      return true
    }
    else{
      const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY); 
      if(refreshToken==null || refreshToken == ""){
        return false
      }
      try{
        var response  = await this.apiService.refreshToken(accessToken, refreshToken)
        if (response.data) {
          this.setToken(response.data.tokenDTO.accessToken, response.data.tokenDTO.refreshToken, response.data.userId)
          return true
        } else {
          return false
        }
      }catch(e){
        console.log(e)
        return false
      }
    }
  }

  logout(){
    this.removeAllTokens()
    this.router.navigate(['login'])
  }
}
