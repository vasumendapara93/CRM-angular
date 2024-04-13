import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotWaveLoaderComponent } from './dot-wave-loder/dot-wave-loader.component';



@NgModule({
  declarations: [
    DotWaveLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
    DotWaveLoaderComponent
  ]
})
export class SharedModule { }
