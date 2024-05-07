import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showNotification: boolean = false;
  
//notification
// togglenotification:boolean = false
// toggleNotification(){
//   this.togglenotification = true;
// }
// onNotificationClose() {
//   this.togglenotification = false;
// }

// 

toggleNotification() {
  this.showNotification = !this.showNotification;
}

closeNotification() {
  this.showNotification = false;
}
}
