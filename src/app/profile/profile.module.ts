import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileModalComponent } from './profile-modal/profile-modal.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ProfileInformationComponent } from './profile-information/profile-information.component';
import { ProfileModelFooterComponent } from './profile-model-footer/profile-model-footer.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileModalComponent,
    ProfilePageComponent,
    ProfileInformationComponent,
    ProfileModelFooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ProfileModule { }
