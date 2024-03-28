import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private apiService: APIService
  ) { }

  isLogingIn = false

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
    this.isLogingIn = true

    try {
      await this.apiService.Userlogin(this.email.value!, this.password.value!)
    }catch{
      console.log("Somthing is wrong")
    }

  this.isLogingIn = false
  }

}
