import { Component } from '@angular/core';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent {
  toggleCreateLeadDropdown($event : Event){
    $event.preventDefault()
    var profileDropdwonList = document.getElementById('createLeadDropdwonList')
    var classes = ['hidden' ,'opacity-100']
    classes.forEach((classTotoggle)=>{
      profileDropdwonList?.classList.toggle(classTotoggle)
    })
  }
}
