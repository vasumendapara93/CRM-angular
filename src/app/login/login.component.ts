import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: APIService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.email.setValue(localStorage.getItem(this.REMEMBER_STORAGE_KEY))
  }

  isLogingIn = false
  msg = ""
  REMEMBER_STORAGE_KEY = "remembered_email"

  email = new FormControl('',
    [
      Validators.required,
      Validators.email
    ])
  password = new FormControl('',
    [
      Validators.required
    ])
  rememberMe = new FormControl()

  loginForm = new FormGroup({
    email: this.email,
    password: this.password,
    rememberMe: this.rememberMe
  })

  async login() {
    if (this.loginForm.valid) {
      this.isLogingIn = true;

      this.apiService.Userlogin(this.email.value!, this.password.value!).subscribe(
        (response) => {
          if (response.data) {
            this.authService.setToken(response.data.token, response.data.user)
            if (this.rememberMe.value) {
              localStorage.setItem(this.REMEMBER_STORAGE_KEY, this.email.value!)
            }
            this.router.navigate([''])
          } else {
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
