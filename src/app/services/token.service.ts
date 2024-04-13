import { Injectable } from '@angular/core';
import IUser from '../model/User.model';
import { StorageService } from './storage.service';
import { APIService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private storageService: StorageService,
    private apiService: APIService
  ) { }

  isAccessTokenExpired(): boolean {
    const accessToken = this.storageService.getAccessToken();
    if (accessToken == null || accessToken == "") {
      return false
    }
    const payload = atob(accessToken.split('.')[1]);
    const parsedPayload = JSON.parse(payload);
    return parsedPayload.exp > Date.now() / 1000
  }

  async refreshToken() {
    try {
      const accessToken = this.storageService.getAccessToken();
      if (accessToken == null || accessToken == "") {
        return false
      }
      const refreshToken = this.storageService.getRefreshToken();
      if (refreshToken == null || refreshToken == "") {
        return false
      }
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
