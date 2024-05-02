import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-model-footer',
  templateUrl: './profile-model-footer.component.html',
  styleUrls: ['./profile-model-footer.component.css']
})
export class ProfileModelFooterComponent {
@Input() email : string = ""
@Input() timespan : string = ""
@Input() imageURL : string = ""
}
