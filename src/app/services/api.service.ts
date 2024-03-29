import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  constructor(
    private httpClient : HttpClient,
    private router : Router,
    ) { }

  private readonly APIorigin : string = "https://r1dq4k84-7246.inc1.devtunnels.ms"

  async Userlogin(email:string, password : string){
    try{
      console.log(email + " " + password)
      let response = await lastValueFrom(this.httpClient.post(this.APIorigin + '/api/user/login', {email : email, password : password} ))
      console.log(response)

      this.router.navigate(['dashboard'])
    }catch(e){
      console.log("something is wrong")
    }
  }
}
