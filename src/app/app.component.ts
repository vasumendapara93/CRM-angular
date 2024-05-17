import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { APIService } from './services/api.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { FloatingDropdownService } from './services/floating-dropdown.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRM';

  constructor(
    private floatingDropdown: FloatingDropdownService
  ) { }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!(event.target as HTMLElement).classList.contains('floating-dropdown-btn')) {
      this.floatingDropdown.closeAllFloatingDropdown()
    }
      window.onscroll = function () { };
  }
}
