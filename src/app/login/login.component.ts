import { Component, OnInit } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { MsgService } from '../services/msg.service';
import { Color } from 'src/assets/static/Color';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private msgService :MsgService
  ) { }

  ngOnInit(): void {
    this.email.setValue(this.storageService.getRememberEmail())
  }

  msgBoxId = "loginMsgBoxId"
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

      this.authService.userlogin(this.email.value!, this.password.value!).subscribe(
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
          console.log(error)
            this.msgService.setColor(this.msgBoxId, Color.danger)
            if (error.error.errorMessages && error.error.errorMessages[0] && error.error.errorMessages[0] != "") {
              this.msgService.setMsg(this.msgBoxId, error.error.errorMessages[0])
            } else {
              this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            }
            this.msgService.openMsgBox(this.msgBoxId)

            this.isLogingIn = false
        }
      )
    }
  }
}
