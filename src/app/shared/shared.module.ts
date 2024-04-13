import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotWaveLoaderComponent } from './dot-wave-loder/dot-wave-loader.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { TagComponent } from './tag/tag.component';



@NgModule({
  declarations: [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    DotWaveLoaderComponent,
    PageHeadingComponent,
    TagComponent
  ]
})
export class SharedModule { }
