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
  stopTimerInterval: Function = ()=>{}

  startCountDown() {
    this.timer = ""
    var distance = 120000
    this.showCountDown = true
    var timerInvterval = setInterval(() => {
      if (distance <= 0) {
        clearInterval(timerInvterval)
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
    var height = 5
    var oldheight = FormOuter!.offsetHeight + 3
    const interval = setInterval(() => {
      if (height >= 100) {
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
      height += 3
    }, 15)
  }

  showOTPField() {
    var OTPField = document.getElementById('OTPField')
    var otpBtn = document.getElementById('otpBtn')
    var verifyBtn = document.getElementById('verifyBtn')
    var FormOuter = OTPField?.parentElement?.parentElement?.parentElement
    var height = 5
    var oldheight = FormOuter!.offsetHeight - 6
    const interval = setInterval(() => {
      if (height >= 100) {
        OTPField?.classList.toggle('hidden')
        OTPField?.classList.toggle('opacity-0')
        otpBtn?.classList.toggle('hidden')
        verifyBtn?.classList.toggle('hidden')
        setTimeout(() => {
          FormOuter!.style.height = 'auto'
        }, 1000);
        clearInterval(interval)
      } else {
        FormOuter!.style.height = (oldheight + height) + 'px'
      }
      height += 3
    }, 15)
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
      this.apiService.verifyOTP(this.email.value!,this.otp.value!.toString()).subscribe(
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
