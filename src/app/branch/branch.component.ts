import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import IBranch from '../model/Branch.model';
import { ActivatedRoute } from '@angular/router';
import IUser from '../model/User.model';
import { API } from 'src/assets/static/API';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MsgService } from '../services/msg.service';
import { Color } from 'src/assets/static/Color';
import { MappingFields } from 'src/assets/static/MappingFields';
import { UploadFileComponent } from '../shared/upload-file/upload-file.component';
import { AlertService } from '../services/alert.service';
import { BtnText } from 'src/assets/static/BtnText';
import { first } from 'rxjs';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent {

  @ViewChild('uploadFileComponent') uploadFileComponent!: UploadFileComponent;

  pageTitle = 'Branches'
  branchList: IBranch[] = []
  filteredList: IBranch[] = []
  selectedUserList: IBranch[] = []
  filterText: string = ""
  user: IUser
  mappingFields = MappingFields

  addLeadId = "add-lead"
  branchNameDropDownId = 'branchNameDropDownId'
  branchCodeDropDownId = 'branchzCodeDropDownId'
  branchCreateDateDropDownId = 'branchCreateDateDropDownId'
  branchActionDropdownId = 'branchActionDropdownId'

  addBranchFloatingModalId = 'addBranchFloatingModalId'
  addBranchCSVFloatingModalId = "addBranchCSVFloatingModalId"

  msgBoxId = 'branchMsgBoxId'
  uploadBoxId = 'uploadFileMsgBoxID'

  isCreatingNewBranch = false

  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private floatingDropdown: FloatingDropdownService,
    private floatingModal: FloatingModalService,
    private route: ActivatedRoute,
    private msgService: MsgService,
    private alertService: AlertService
  ) {
    this.user = this.route.snapshot.data['user'];
    this.getbranches()
  }

  branchName = new FormControl('',
    [
      Validators.required,
    ])
  branchCode = new FormControl('',
    [
      Validators.required
    ])

  newBranchFrom = new FormGroup({
    branchName: this.branchName,
    branchCode: this.branchCode
  })

  openAddBranchForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addBranchFloatingModalId)
    this.newBranchFrom.reset()
    console.log(this.floatingModal.isFloatingModalOpen(this.addBranchFloatingModalId))
  }

  openAddBranchCSVForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addBranchCSVFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addBranchCSVFloatingModalId))
  }


  toggelUserSelect(event: Event, branch: IBranch) {
    var allChechbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList.push(branch)
    } else {
      this.selectedUserList = this.selectedUserList.filter((userInList) => userInList != branch)
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
    this.branchList.forEach(branch => {
      if (regex.test(branch.branchName)) {
        this.filteredList.push(branch)
      } else if (regex.test(branch.branchCode)) {
        this.filteredList.push(branch)
      }
    });
  }

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  async createNewBranch() {
    if (this.newBranchFrom.valid) {
      this.isCreatingNewBranch = true
      try {
        this.apiService.post(API.CREATE_BRANCHE,
          {
            branchName: this.branchName.value,
            branchCode: this.branchCode.value,
            organizationId: this.user.id
          }, {
          headers: await this.authService.getAuthorizationHeader()
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Branch Created Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.floatingModal.closeFloatingModal(this.addBranchFloatingModalId)
              this.getbranches()
              this.newBranchFrom.reset()
            }
            this.isCreatingNewBranch = false
          },
          (error) => {
            console.log(error)

            this.msgService.setColor(this.msgBoxId, Color.danger)
            this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            this.msgService.openMsgBox(this.msgBoxId)
          }
        )
      } catch (e) {
        console.log(e)
      }
    }
  }

  deleteSeletedRecords() {
    this.alertService.setAlert({
      title: 'Are you sure you want to delete the selected record?',
      msg: 'Note: Any associated Activities, Visits, Drafts will also be Deleted',
      okBtnColor: Color.danger,
      okBtnText: BtnText.delete,
      cancelBtnText : BtnText.cancel
    })
    this.alertService.onActionClicked.pipe(first()).subscribe(value =>{
      if(value){
        
      }
    })
  }

  async createBranchRange(emitedList: { [key: string]: any }[]) {
    var newBarnchList: IBranch[] = []
    emitedList.forEach(item => {
      item['organizationId'] = this.user.id
      newBarnchList.push(item as IBranch)
    })
    console.log(newBarnchList)
    this.apiService.post(API.CREATE_BRANCHE_RANGE, newBarnchList, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response) {
          this.msgService.setColor(this.msgBoxId, Color.success)
          this.msgService.setMsg(this.msgBoxId, 'Branches Created Successfully')
          this.msgService.openMsgBox(this.msgBoxId)
          this.getbranches()
          this.floatingModal.closeFloatingModal(this.addBranchCSVFloatingModalId)
          this.uploadFileComponent.file = null
          this.uploadFileComponent.isExtracting = false
          this.uploadFileComponent.isFileAccepted = false
          this.uploadFileComponent.isReadingFile = false
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async getbranches() {
    this.apiService.get(API.GET_BRANCHES + '/' + this.user.id, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.branchList = response.data
          this.filteredList = this.branchList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
