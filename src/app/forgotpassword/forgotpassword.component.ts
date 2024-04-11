import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { delay, interval, timeInterval } from 'rxjs';
import { APIService } from '../services/api.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(
    private apiService: APIService
  ) { }

  isSendingOTP = false
  isVerifing = false
  msg = ""
  showCountDown = false
  timer = ""
  showChangeEmailBtn = false
  stopTimerInterval: Function = () => { }
  resendOTPEnable = false
  stopResendOTPTimeout: Function = () => { }

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

  forgotPasswordForm = new FormGroup({
    email: this.email,
    password: this.otp,
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
    var otpBtn = document.getElementById('otpBtn')
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
      this.apiService.sendOTP(this.email.value!).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.msg = ""
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
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
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
      this.apiService.sendOTP(this.email.value!).subscribe(
        (response) => {
          if (response.statusCode == 200) {
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
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
          }
          this.isSendingOTP = false
        }
      )
    }
  }

  async verify() {
    if (this.forgotPasswordForm.valid) {
      this.isVerifing = true
      this.apiService.verifyOTP(this.email.value!, this.otp.value!.toString()).subscribe(
        (response) => {
          if (response.statusCode == 200) {
            this.msg = ""
          }
          this.isVerifing = false
        },
        (error) => {
          console.log(error.error)
          if (error.error.errorMessages[0] != null || error.error.errorMessages[0] != "") {
            this.msg = error.error.errorMessages[0]
          } else {
            this.msg = "Somthing Is Wrong Try Again Later"
          }
          this.isVerifing = false
        }
      )

    }
  }
}
