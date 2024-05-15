import { Component,OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FloatingModalService } from 'src/app/services/floating-modal.service';
import { Validators,FormControl } from '@angular/forms';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }

  constructor(
    private floatingModal : FloatingModalService
  ){}

  
  Mobilenumber = new FormControl('',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
    
  addNumberFloatingModalId = "addNumberFloatingModalId"

  openPhoneNumberForm(event : Event){
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addNumberFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addNumberFloatingModalId))
  }

  mobilenumber : string =""
  emailAddress : string =""

  mobileImageURLs: string[] = [
    'assets/images/profileImages/p1.svg',
    'assets/images/profileImages/p2.svg',
    'assets/images/profileImages/p3.svg'
  ];
  mobileRandomIndex: number = Math.floor(Math.random() * this.mobileImageURLs.length);
  mobileRandomString: string = this.mobileImageURLs[this.mobileRandomIndex];

  emailImageURLs: string[] = [
    'assets/images/profileImages/e1.svg',
    'assets/images/profileImages/e2.svg',
    'assets/images/profileImages/e3.svg'
  ];
  emailRandomIndex: number = Math.floor(Math.random() * this.emailImageURLs.length);
  emailRandomString: string = this.emailImageURLs[this.emailRandomIndex];



}

