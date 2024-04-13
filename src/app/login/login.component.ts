import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: APIService,
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.email.setValue(this.storageService.getRememberEmail())
  }

  isLogingIn = false
  msg = ""

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

      this.apiService.userlogin(this.email.value!, this.password.value!).subscribe(
        (response) => {
          console.log(response)
          if (response.data) {
            this.msg = ""
            this.storageService.setToken(response.data.tokenDTO.accessToken, response.data.tokenDTO.refreshToken, response.data.userId)
            if (this.rememberMe.value) {
              this.storageService.setRememberEmail(this.email.value!)
            }
            this.router.navigate([''])
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
          }
          this.isLogingIn = false
        },
        (error) => {
          console.log(error.error )
          if (error.error.errorMessages[0] || error.error.errorMessages[0] != "") {
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
