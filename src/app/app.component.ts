import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
import { APIService } from './services/api.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'CRM';
}
