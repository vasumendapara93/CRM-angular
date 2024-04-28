import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APIService } from '../services/api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(
    private authService: AuthService,
    private storageService : StorageService,
    private router : Router
  ) { }

  showmsg = false
  isSendingOTP = false
  isVerifing = false
  msg = ""
  showCountDown = false
  timer = ""
  showChangeEmailBtn = false
  stopTimerInterval: Function = () => { }
  resendOTPEnable = false
  stopResendOTPTimeout: Function = () => { }
  showPassword = false
  emailValue = ""
  isChanging = false

  startCountDown() {
    this.timer = ""
    var distance = 120000
    var timerInvterval = setInterval(() => {
      if (distance <= 0) {
        clearInterval(timerInvterval)
      }
      if (!this.showCountDown) {
        this.showCountDown = true
        this.resendOTPTimeout()
      }
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.timer = `${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}`
      distance -= 1000
    }, 1000)

    this.stopTimerInterval = () => {
      clearInterval(timerInvterval)
    }
  }

  resendOTPTimeout() {
    const resentTimeOut = setTimeout(() => this.resendOTPEnable = true, 30000)
    this.stopResendOTPTimeout = () => {
      this.resendOTPEnable = false
      clearTimeout(resentTimeOut)
    }
  }

  email = new FormControl('',
    [
      Validators.required,
      Validators.email
    ])
  otp = new FormControl('',
    [
      Validators.required
    ])
  newPassword = new FormControl('',
    [
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/),
      Validators.required
    ]
  )

  forgotPasswordForm = new FormGroup({
    email: this.email,
    otp: this.otp,
    newPassword : this.newPassword
  })

  hideOTPField() {
    var OTPField = document.getElementById('OTPField')
    var otpBtn = document.getElementById('otpBtn')
    var verifyBtn = document.getElementById('verifyBtn')
    var FormOuter = OTPField?.parentElement?.parentElement?.parentElement
    var height = 1
    var oldheight = FormOuter!.offsetHeight
    const interval = setInterval(() => {
      if (height >= 96) {
        OTPField?.classList.toggle('hidden')
        OTPField?.classList.toggle('opacity-0')
        otpBtn?.classList.toggle('hidden')
        verifyBtn?.classList.toggle('hidden')
        setTimeout(() => {
          FormOuter!.style.height = 'auto'
        }, 700);
        clearInterval(interval)
      } else {
        FormOuter!.style.height = (oldheight - height) + 'px'
      }
      height += 1
    }, 5)
  }

  showOTPField() {
    var OTPField = document.getElementById('OTPField')
    var otpBtn = document.getElementById('optBtn')
    var verifyBtn = document.getElementById('verifyBtn')
    var FormOuter = OTPField?.parentElement?.parentElement?.parentElement
    var height = 1
    var oldheight = FormOuter!.offsetHeight - 1
    const interval = setInterval(() => {
      if (height >= 94) {
        OTPField?.classList.toggle('hidden')
        OTPField?.classList.toggle('opacity-0')
        otpBtn?.classList.toggle('hidden')
        verifyBtn?.classList.toggle('hidden')
        console.log()
        setTimeout(() => {
          FormOuter!.style.height = 'auto'
        }, 1000);
        clearInterval(interval)
      } else {
        FormOuter!.style.height = (oldheight + height) + 'px'
      }
      height += 1
    }, 5)
  }

  showNewPasswordField(){
    var newPasswordFied = document.getElementById('newPasswordFied')
    var OTPField = document.getElementById('OTPField')
    var emailField = document.getElementById('emailField')
    var changePasswordBtn = document.getElementById('changePasswordBtn')
    var verifyBtn = document.getElementById('verifyBtn')
    var FormOuter = newPasswordFied?.parentElement?.parentElement
    var height = 1
    var oldheight = FormOuter!.offsetHeight
    const interval = setInterval(() => {
      if (height >= 93) {
        newPasswordFied?.classList.toggle('hidden')
        newPasswordFied?.classList.toggle('opacity-0')
        OTPField?.classList.toggle('hidden')
        OTPField?.classList.toggle('opacity-0')
        changePasswordBtn?.classList.toggle('hidden')
        emailField?.classList.toggle('hidden')
        verifyBtn?.classList.toggle('hidden')
        this.showCountDown = false
        this.resendOTPEnable = false
        this.timer = ""
        this.stopResendOTPTimeout()
        this.stopTimerInterval()
        setTimeout(() => {
          FormOuter!.style.height = 'auto'
        }, 700);
        clearInterval(interval)
      } else {
        FormOuter!.style.height = (oldheight - height) + 'px'
      }
      height += 1
    }, 5)
  }

  showPasswordToggle(event : Event){
    event.preventDefault()
    var eyeIcon = document.getElementById('eye-icon')
    eyeIcon?.classList.toggle('fa-eye')
    eyeIcon?.classList.toggle('fa-eye-slash')
    this.showPassword = !this.showPassword
  }

  changeEmail() {
    var OTPField = document.getElementById('OTPField')
    var FormOuter = OTPField?.parentElement?.parentElement?.parentElement
    FormOuter!.style.height = (FormOuter!.offsetHeight + 3) + "px"
    this.email.enable()
    this.showChangeEmailBtn = false
    this.showCountDown = false
    this.hideOTPField()
    this.stopTimerInterval()
    this.stopResendOTPTimeout()
  }

  resendOTP(event: Event) {
    event.preventDefault()
    this.email.enable()
    if (this.email.valid) {
      this.isVerifing = true
      this.resendOTPEnable = false
      this.timer = ""
      this.stopResendOTPTimeout()
      this.stopTimerInterval()
      this.authService.sendOTP(this.email.value!).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.msg = ""
            this.showmsg = false
            this.email.disable()
            this.startCountDown()
            this.resendOTPTimeout()
          }
          this.isVerifing = false
          this.showChangeEmailBtn = true
        },
        (error) => {
          console.log(error.error)
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
            this.showmsg = true
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
            this.showmsg = true
          }
          this.isVerifing = false
        }
      )
    }
  }

  getOTP(event: Event) {
    event.preventDefault()
    if (this.email.valid) {
      this.isSendingOTP = true
      this.authService.sendOTP(this.email.value!).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.showmsg = false
            this.msg = ""
            this.email.disable()
            this.startCountDown()
            this.showOTPField()
          }
          this.isSendingOTP = false
          this.showChangeEmailBtn = true
        },
        (error) => {
          console.log(error.error)
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
            this.showmsg = true
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
            this.showmsg = true
          }
          this.isSendingOTP = false
        }
      )
    }
  }

 verify(event : Event) {
  event.preventDefault()
  this.email.enable()
    if (this.email.valid) {
      this.email.disable()
      this.isVerifing = true
      this.emailValue = this.email.value!
      this.authService.verifyOTP(this.emailValue, this.otp.value!.toString()).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.msg = ''
            this.showmsg = false
            this.email.disable()
            this.showNewPasswordField()
          }
          this.isVerifing = false
        },
        (error) => {
          console.log(error.error)
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
            this.showmsg= true
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
            this.showmsg = true
          }
          this.isVerifing = false
        }
      )
    }
  }

  changePassword(event : Event) {
    event.preventDefault()
    if (this.newPassword.valid) {
      this.isChanging = true
      this.email.disable()
      this.authService.changePassword(this.emailValue, this.newPassword.value!.toString()).subscribe(
        (response) => {
          console.log(response)
          if (response.statusCode == 200) {
            this.msg = ''
            this.showmsg = false
            this.authService.userlogin(this.emailValue, this.newPassword.value!).subscribe(
              (response) => {
                console.log(response)
                if (response.data) {
                  this.msg = ""
                  this.storageService.setToken(response.data.tokenDTO.accessToken, response.data.tokenDTO.refreshToken, response.data.userId)
                  this.router.navigate([''])
                  this.isChanging = false
                } else {
                  this.msg = "Somthing Is Wrong Try Again Later"
                  this.isChanging = false
                }
              },
              (error) => {
                console.log(error.error )
                this.isChanging = false
                if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
                  this.msg = error.error.errorMessages[0]
                } else {
                  this.msg = "Somthing Is Wrong Try Again Later"
                  this.isChanging = false
                }
              }
            )
          }
          
        },
        (error) => {
          console.log(error.error)
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
            this.showmsg= true
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
            this.showmsg = true
          }
          this.isChanging = false
        }
      )
    }
  }
}