import { Component,OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
  mobilenumber : string ="1"
  emailAddress : string ="1"

  mobileImageURLs: string[] = [
    'assets/images/profileImages/p1.svg',
    'assets/images/profileImages/p2.svg',
    'assets/images/profileImages/p3.svg',
    'assets/images/profileImages/p4.svg',
    'assets/images/profileImages/p5.svg',
    'assets/images/profileImages/p6.svg'
  ];
  mobileRandomIndex: number = Math.floor(Math.random() * this.mobileImageURLs.length);
  mobileRandomString: string = this.mobileImageURLs[this.mobileRandomIndex];

  emailImageURLs: string[] = [
    'assets/images/profileImages/e1.svg',
    'assets/images/profileImages/e2.svg',
    'assets/images/profileImages/e3.svg',
    'assets/images/profileImages/e4.svg',
    'assets/images/profileImages/e5.svg',
  ];
  emailRandomIndex: number = Math.floor(Math.random() * this.emailImageURLs.length);
  emailRandomString: string = this.emailImageURLs[this.emailRandomIndex];

}

