import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit{
  user = {
    fullName: 'Darshil Savaliya',
    displayName: 'Darshil Savaliya',
    email: '21amtics004@gmail.com',
    gender: "I'd prefer not to say",
    countryFlag: '🇮🇳',
    country: 'India',
    state: 'Gujarat',
    language: 'English - United States',
    timezone: '(GMT +05:30) India Standard Time ( Asia/Kolkata )'
  };

  isEditing = false;
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initProfileForm();
  }

  initProfileForm() {
    this.profileForm = this.fb.group({
      fullName: [this.user.fullName, Validators.required],
      displayName: [this.user.displayName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
      gender: [this.user.gender],
      country: [this.user.country, Validators.required],
      state: [this.user.state, Validators.required],
      language: [this.user.language, Validators.required],
      timezone: [this.user.timezone, Validators.required]
    });
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    if (this.profileForm.valid) {
      // Update user data with form values
      this.user = { ...this.user, ...this.profileForm.value };
      this.isEditing = false;
    }
  }
}

