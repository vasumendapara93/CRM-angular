import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly ACCESS_TOKEN_STORAGE_KEY : string = 'AccessToken'
  private readonly REFRESH_TOKEN_STORAGE_KEY : string = 'RefreshToken'
  private readonly USER_ID_STORAGE_KEY : string = 'UserID'
  private readonly REMEMBER_EMAIL_STORAGE_KEY : string = "RememberedEmail"

  setToken(accessToken : string, refreshToken : string,  userId : string){
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, refreshToken)
    localStorage.setItem(this.USER_ID_STORAGE_KEY, userId)
  }

  setRefreshedAccessToken(accessToken : string, refreshToken : string){
    localStorage.setItem(this.ACCESS_TOKEN_STORAGE_KEY, accessToken)
    localStorage.setItem(this.REFRESH_TOKEN_STORAGE_KEY, refreshToken)
  }

  getAccessToken(){
    return localStorage.getItem(this.ACCESS_TOKEN_STORAGE_KEY)
  }
  
  getUserId(){
    return localStorage.getItem(this.USER_ID_STORAGE_KEY)
  }

  getRefreshToken(){
    return localStorage.getItem(this.REFRESH_TOKEN_STORAGE_KEY)
  }

  getRememberEmail(){
    return localStorage.getItem(this.REMEMBER_EMAIL_STORAGE_KEY)
  }

  setRememberEmail(email : string){
    return localStorage.setItem(this.REMEMBER_EMAIL_STORAGE_KEY, email)
  }

  removeAllTokens(){
    localStorage.removeItem(this.ACCESS_TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_STORAGE_KEY)
    localStorage.removeItem(this.USER_ID_STORAGE_KEY)
  }

}
