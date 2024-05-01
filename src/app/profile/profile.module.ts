import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';



@NgModule({
  declarations: [
    ProfileModalComponent,
    ProfilePageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProfileModule { }
