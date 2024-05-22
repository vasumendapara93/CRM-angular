import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import IUser from '../model/User.model';
import { ActivatedRoute } from '@angular/router';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { API } from 'src/assets/static/API';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //notification
  @Output() toggleNotification = new EventEmitter<void>();

  user: IUser
  ProfileDropdownId = 'profileDropdown'
  API = API
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private floatingDropdown: FloatingDropdownService
  ) {
    this.user = this.route.snapshot.data['user'];
  }

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

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  onToggleNotification() {
    this.toggleNotification.emit();
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
    var classes = ['transition-all', 'fixed', 'inset-0', 'z-40', 'bg-gray-900', 'bg-opacity-50']
    backdrop.classList.add(...classes);
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

  toggleProfileDropdown($event: Event) {
    $event.preventDefault()
    var profileDropdwonList = document.getElementById('profileDropdwonList')
    var classes = ['hidden', 'opacity-100']
    classes.forEach((classTotoggle) => {
      profileDropdwonList?.classList.toggle(classTotoggle)
    })
  }

  logout($event: Event) {
    $event.preventDefault()
    this.authService.logout()
  }
}
