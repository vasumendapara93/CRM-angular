import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleFullScreen(){
    var fullScreenToggleBtnIcon = document.getElementById('fullScreenToggleBtnIcon')
    console.log("hello")
    fullScreenToggleBtnIcon?.classList.toggle('fa-compress')
    fullScreenToggleBtnIcon?.classList.toggle('fa-expand')
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
      }
  } else {
    document.exitFullscreen()
  }
  }
}
