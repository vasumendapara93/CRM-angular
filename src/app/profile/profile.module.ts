import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileModelFooterComponent } from './profile-model-footer/profile-model-footer.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProfileModalComponent,
    ProfilePageComponent,
    ProfileModelFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
