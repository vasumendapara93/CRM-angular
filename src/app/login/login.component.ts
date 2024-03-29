import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private apiService: APIService,
    private router: Router,
    private authService : AuthService
  ) { }

  isLogingIn = false
  msg = ""
  buttonText = "Get Started"

  email = new FormControl('',
    [
      Validators.required,
      Validators.email
    ])
  password = new FormControl('',
    [
      Validators.required
    ])

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  })

  async login() {
    if (this.loginForm.valid) {
      this.isLogingIn = true;

      this.apiService.Userlogin(this.email.value!, this.password.value!).subscribe(
        (response) => {
          if(response.data){
            this.authService.setToken(response.data.token, response.data.user)
            this.router.navigate([''])
          }else{
            this.msg = "Somthing Is Wrong Try Again Later"
          }
          this.isLogingIn = false
        },
        (error) => {
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
          }
          this.isLogingIn = false
        }
      )
    }
  }
}
