import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotWaveLoaderComponent } from './dot-wave-loder/dot-wave-loader.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { TagComponent } from './tag/tag.component';
import { FloatingDropdownComponent } from './floating-dropdown/floating-dropdown.component';
import { NotificationComponent } from './notification/notification.component';


@NgModule({
  declarations: [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent,
    FloatingDropdownComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent,
    FloatingDropdownComponent,
    NotificationComponent
  ]
})
export class SharedModule { }
