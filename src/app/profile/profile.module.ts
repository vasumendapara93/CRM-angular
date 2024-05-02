import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';



@NgModule({
  declarations: [
    ProfileModalComponent,
    ProfilePageComponent,
    ProfileInformationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
