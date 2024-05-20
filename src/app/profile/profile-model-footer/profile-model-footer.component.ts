import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-model-footer',
  templateUrl: './profile-model-footer.component.html',
  styleUrls: ['./profile-model-footer.component.css']
})
export class ProfileModelFooterComponent {
  @Input() email: string = ""
  @Input() timespan: string = ""
  @Input() icon : string = ''

  colorList = [
    '#f74f63',
    '#ffbe39',
    '#00b4fb',
    '#00bf9a',
    '#ff6640',
    '#0082f9',
    '#ff982e',
    '#31b560',
    '#795ff8'
  ]

  bgColor: string

  constructor() {
    var i = Math.floor(Math.random() * this.colorList.length)
    this.bgColor = this.colorList[i]
  }
}