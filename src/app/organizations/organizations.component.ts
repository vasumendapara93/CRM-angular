import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { API } from 'src/assets/static/API';
import IUser from '../model/User.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent {

  pageTitle = 'Organizations'
  OrgList: IUser[] = []
  filteredList: IUser[] = []
  filterText: string = ""

  constructor(
    private apiService: APIService,
    private authService: AuthService
  ) {
    this.getOrgs()
  }

  filterData(event: Event) {
    event.preventDefault();
    this.filteredList = this.OrgList.filter((org) =>
      org.name.includes(this.filterText) ||
      org.phoneNumber.includes(this.filterText) ||
      org.contactPerson!.includes(this.filterText) ||
      org.email.includes(this.filterText)
    )
  }

  toggleCreateLeadDropdown($event: Event) {
    $event.preventDefault()
    var profileDropdwonList = document.getElementById('createLeadDropdwonList')
    var classes = ['hidden', 'opacity-100']
    classes.forEach((classTotoggle) => {
      profileDropdwonList?.classList.toggle(classTotoggle)
    })
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
