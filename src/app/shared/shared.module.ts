import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotWaveLoaderComponent } from './dot-wave-loder/dot-wave-loader.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { TagComponent } from './tag/tag.component';
import { FloatingDropdownComponent } from './floating-dropdown/floating-dropdown.component';
import { NotificationComponent } from './notification/notification.component';
import { FloatingModalComponent } from './floating-modal/floating-modal.component';
import { InputComponent } from './input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';
import { MsgComponent } from './msg/msg.component';
import { EventBlockerDirective } from '../services/directives/event-blocker.directive';


@NgModule({
  declarations: [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent,
    FloatingDropdownComponent,
    NotificationComponent,
    FloatingModalComponent,
    InputComponent,
    MsgComponent,
    EventBlockerDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective
  ],
  exports: [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent,
    FloatingDropdownComponent,
    NotificationComponent,
    FloatingModalComponent,
    InputComponent,
    MsgComponent
  ],
  providers:[
    provideEnvironmentNgxMask(),
  ]
})
export class SharedModule { }
