import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { API } from 'src/assets/static/API';
import IUser from '../model/User.model';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {

  pageTitle = 'Organizations'
  OrgList: IUser[] = []
  filteredList: IUser[] = []
  selectedUserList: IUser[] = []
  filterText: string = ""

  addLeadId = "add-lead"
  leadNameDropDownId = 'leadNameDropDownId'
  leadContactPersonDropDownId = 'leadContactPersonDropDownId'
  leadContactNumberDropDownId = 'leadContactNumberDropDownId'
  leadEmailDropDownId = 'leadEmailDropDownId'
  addOrgFloatingModalId = "addOrgFloatingModalId"

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private floatingDropdown : FloatingDropdownService,
    private floatingModal : FloatingModalService
  ) {
    this.getOrgs()
  }


  openAddOrgForm(event : Event){
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addOrgFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addOrgFloatingModalId))
  }


  toggelUserSelect(event : Event, user : IUser){
    var allChechbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if(checkbox.checked){
      this.selectedUserList.push(user)
    }else{
      this.selectedUserList= this.selectedUserList.filter((userInList)=> userInList != user)
    }
    if(this.selectedUserList.length == this.filteredList.length){
      allChechbox.checked = true
      allChechbox.indeterminate = false
    }else if(this.selectedUserList.length != 0){
      allChechbox.indeterminate = true
      allChechbox.checked = false
    }else{
      allChechbox.checked = false
      allChechbox.indeterminate = false
    }
    console.log(this.selectedUserList)
  }

  toggelAllUserSelection(event : Event){
    var checkbox = event.target as HTMLInputElement
    if(checkbox.checked){
      this.selectedUserList = this.filteredList
    }
    if(!checkbox.checked){
      this.selectedUserList = []
    }
  }

  filterData(event: Event) {
    event.preventDefault();
    var regex = new RegExp(this.filterText, "i");
    this.filteredList = []
    this.OrgList.forEach(org => {
      if(regex.test(org.name)){
        this.filteredList.push(org)
      }else if(regex.test(org.phoneNumber!)){
        this.filteredList.push(org)
      }else if(regex.test(org.contactPerson!)){
        this.filteredList.push(org)
      }else if(regex.test(org.email)){
        this.filteredList.push(org)
      }
    });
  }

  openFloatingDropdown(event: Event,id :string){
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  async getOrgs() {
    this.apiService.get(API.GET_ORGANIZATIONS, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.OrgList = response.data
          this.filteredList = this.OrgList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
