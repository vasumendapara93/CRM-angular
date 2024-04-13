import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotWaveLoaderComponent } from './dot-wave-loder/dot-wave-loader.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';



@NgModule({
  declarations: [
    DotWaveLoaderComponent,
    PageHeadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    DotWaveLoaderComponent,
    PageHeadingComponent
  ]
})
export class SharedModule { }
