import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIService } from 'src/app/services/api.service';
import { API } from 'src/assets/static/API';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {
  constructor(
    private apiService : APIService,
    private route : ActivatedRoute,
    private router : Router
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params['id'] ?? ''
      this.activationToken = params['token'] ?? ''
      if(this.userId == null || this.userId =='' || this.activationToken == null || this.activationToken == ''){
        this.pageError = true
        this.errorMsg = 'The URL you\'re trying to access doesn\'t exists. Please check the link and try again.'
      }
    })
  }

  userId = ''
  activationToken = ''
  pageError = false
  errorMsg = 'The URL you\'re trying to access doesn\'t exists. Please check the link and try again.'

  name = new FormControl('',[
    Validators.required,
  ])
  password = new FormControl('',
  [
    Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/),
    Validators.required
  ])
  isActivating = false

  activationForm = new FormGroup({
    name :this.name,
    password : this.password
  })

  activateAccount(event :Event){
    event.preventDefault();
    if(this.activationForm.valid){
      this.isActivating = true
      try {
        this.apiService.post(API.ACTIVATE_ACCOUNT , {
          name : this.name.value,
          password : this.password.value,
          userId : this.userId,
          activationToken : this.activationToken
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.success) {
              this.isActivating = false
              this.router.navigate(['login'])
            }
          },
          (error) => {
            console.log(error)
            if (error.error.errorMessages && error.error.errorMessages[0] && error.error.errorMessages[0] != "") {
              this.errorMsg = error.error.errorMessages[0]
            }
            this.pageError = true
            this.isActivating = false
          }
        )
      } catch (e) {
        console.log(e)
        this.isActivating = false
      }
    }
  }

}
