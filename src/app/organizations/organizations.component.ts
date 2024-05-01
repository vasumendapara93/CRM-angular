import { Component } from '@angular/core';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {
  toggleCreateLeadDropdown($event : Event){
    $event.preventDefault()
    var profileDropdwonList = document.getElementById('createLeadDropdwonList')
    var classes = ['hidden' ,'opacity-100']
    classes.forEach((classTotoggle)=>{
      profileDropdwonList?.classList.toggle(classTotoggle)
    })
  }
}
