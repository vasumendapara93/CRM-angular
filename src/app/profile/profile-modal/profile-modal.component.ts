import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css']
})
export class ProfileModalComponent {
@Input() title: string = ""
@Input() subTitle: string = ""

}
