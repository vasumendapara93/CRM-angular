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

  OrgList: IUser[] = []

  constructor(
    private apiService: APIService,
    private authService : AuthService
  ) {
    this.getOrgs()
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
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
