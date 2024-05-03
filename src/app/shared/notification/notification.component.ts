import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent {
  @Output() closeNotification = new EventEmitter<void>();

  isNotificationClosed: boolean = true;

  onCloseNotification() {
    // this.closeNotification.emit();  

    this.isNotificationClosed = false; // Set to false to trigger closing animation
    setTimeout(() => {
      this.isNotificationClosed = true; // Set to true after the animation finishes
      this.closeNotification.emit();
      console.log(this.isNotificationClosed);
    }, 450);
  }

  
}
