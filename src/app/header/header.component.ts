import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  toggleFullScreen() {
    var fullScreenToggleBtnIcon = document.getElementById('fullScreenToggleBtnIcon')
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

  toggleSideNavBar() {
    // Menu Toggle Button ( Placed in Topbar)
    var html = document.getElementsByTagName("html")[0];
    var view = html.getAttribute('data-sidebar-view');

    if (view === 'mobile') {
      this.showBackdrop();
      html.classList.toggle('sidebar-open');
    } else {
      if (view === 'hidden') {
        html.setAttribute("data-sidebar-view", "default");
      } else {
        html.setAttribute("data-sidebar-view", "hidden");
      }
    }
  }

  showBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.id = 'backdrop';
    backdrop.classList.remove(backdrop.classList.toString())
    backdrop.classList.add('transition-all fixed inset-0 z-40 bg-gray-900 bg-opacity-50');
    document.body.appendChild(backdrop);

    if (document.getElementsByTagName('html')[0]) {
      document.body.style.overflow = "hidden";
      if (window.innerWidth > 1140) {
        document.body.style.paddingRight = "17px";
      }
    }

    const self = this
    backdrop.addEventListener('click', function (e) {
      document.getElementsByTagName('html')[0].classList.remove('sidebar-open');
      self.hideBackdrop();
    })
  }

  hideBackdrop() {
    var backdrop = document.getElementById('backdrop');
    if (backdrop) {
      document.body.removeChild(backdrop);
      document.body.style.overflow = 'null';
      document.body.style.paddingRight = 'null';
    }
  }
}
