import { Component } from '@angular/core';
import IUser from '../model/User.model';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import { API } from 'src/assets/static/API';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from 'src/assets/static/UserRole';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {

  pageTitle = 'Employees'
  userList: IUser[] = []
  filteredList: IUser[] = []
  selectedUserList: IUser[] = []
  filterText: string = ""
  user : IUser
  UserRole = UserRole

  addLeadId = "add-lead"
  NameDropDownId = 'NameDropDownId'
  ContactNumberDropDownId = 'ContactNumberDropDownId'
  EmailDropDownId = 'EmailDropDownId'
  roleDropDownId = 'roleDropDownId'
  branchDropDownId = 'branchDropDownId'
  joiningDateDropDownId = 'joiningDateDropDownId'
  addressDropDownId = 'addressDropDownId'

  addOrgFloatingModalId = "addOrgFloatingModalId"

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private floatingDropdown: FloatingDropdownService,
    private floatingModal: FloatingModalService,
    private route : ActivatedRoute
  ) {
    this.user = this.route.snapshot.data['user'];
    this.getUsers()
  }


  openAddOrgForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addOrgFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addOrgFloatingModalId))
  }


  toggelUserSelect(event: Event, user: IUser) {
    var allChechbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList.push(user)
    } else {
      this.selectedUserList = this.selectedUserList.filter((userInList) => userInList != user)
    }
    if (this.selectedUserList.length == this.filteredList.length) {
      allChechbox.checked = true
      allChechbox.indeterminate = false
    } else if (this.selectedUserList.length != 0) {
      allChechbox.indeterminate = true
      allChechbox.checked = false
    } else {
      allChechbox.checked = false
      allChechbox.indeterminate = false
    }
    console.log(this.selectedUserList)
  }

  toggelAllUserSelection(event: Event) {
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList = this.filteredList
    }
    if (!checkbox.checked) {
      this.selectedUserList = []
    }
  }

  filterData(event: Event) {
    event.preventDefault();
    var regex = new RegExp(this.filterText, "i");
    this.filteredList = []
    this.userList.forEach(user => {
      if (regex.test(user.name)) {
        this.filteredList.push(user)
      } else if (regex.test(user.phoneNumber)) {
        this.filteredList.push(user)
      } else if (regex.test(user.contactPerson!)) {
        this.filteredList.push(user)
      } else if (regex.test(user.email)) {
        this.filteredList.push(user)
      }
    });
  }

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  async getUsers() {
    console.log(this.user)
    this.apiService.get(API.GET_EMPLOYEES + '/' + this.user.id, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.userList = response.data
          this.filteredList = this.userList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
