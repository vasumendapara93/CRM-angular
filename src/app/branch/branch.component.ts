import { Component } from '@angular/core';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import IBranch from '../model/Branch.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {

  pageTitle = 'Branches'
  BranchList: IBranch[] = []
  filteredList: IBranch[] = []
  selectedBranchList: IBranch[] = []
  filterText: string = ""

  branchNameDropDownId = 'branchNameDropDownId'
  addBranchFloatingModalId = "addBranchFloatingModalId"

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private floatingDropdown : FloatingDropdownService,
    private floatingModal : FloatingModalService
  ) {
    this.getbranches()
  }

  openAddBranchForm(event : Event){
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addBranchFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addBranchFloatingModalId))
  }

  toggelUserSelect(event : Event, branch : IBranch){
    var allChechbox = document.getElementById('AllBranchCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if(checkbox.checked){
      this.selectedBranchList.push(branch)
    }else{
      this.selectedBranchList= this.selectedBranchList.filter((userInList)=> userInList != branch)
    }
    if(this.selectedBranchList.length == this.filteredList.length){
      allChechbox.checked = true
      allChechbox.indeterminate = false
    }else if(this.selectedBranchList.length != 0){
      allChechbox.indeterminate = true
      allChechbox.checked = false
    }else{
      allChechbox.checked = false
      allChechbox.indeterminate = false
    }
    console.log(this.selectedBranchList)
  }

}
