import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { APIService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import IBranch from '../model/Branch.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
export class BranchComponent implements OnInit{

  @ViewChild('uploadFileComponent') uploadFileComponent!: UploadFileComponent;

  pageTitle = 'Branches'
  branchList: IBranch[] = []
  filteredList: IBranch[] = []
  selectedUserList: IBranch[] = []
  filterText: string = ""
  totalRecords = 0
  recordPerPage = 10
  pageNoShowLimit = 3
  pageNo: number = 1
  recordPerPageOptions = [10,20,30,50,75,100]
  pageNoOptions : number[] = []
  user: IUser
  mappingFields = MappingFields

  addLeadId = "add-lead"
  branchNameDropDownId = 'branchNameDropDownId'
  branchCodeDropDownId = 'branchzCodeDropDownId'
  branchCreateDateDropDownId = 'branchCreateDateDropDownId'
  branchActionDropdownId = 'branchActionDropdownId'
  branchRecordPerPageId = 'branchRecordPerPageId'

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
    private alertService: AlertService,
    private router: Router
  ) {
    this.user = this.route.snapshot.data['user'];
    this.getbranches()
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.pageNo = params['pageNo'] ?? 1
      this.recordPerPage = params['recordPerPage'] ?? 10
      this.getbranches()
    })

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

  changeRecordPerPage(recordPerPage: number){
    this.router.navigate([],
    {
      queryParams: {
        recordPerPage: recordPerPage,
        pageNo: 1
      }
    })
  }

  onPrevious(pageNo: number){

    if(this.pageNo <= 1){
      return
    }
    this.changePageNo(Number(pageNo) - 1)
  }

  onNext(pageNo: number){
    if(this.pageNo >= this.pageNoOptions.length){
      return
    }
    this.changePageNo(Number(pageNo) + 1)
  }

  changePageNo(pageNo: number){
    this.router.navigate([],
    {
      queryParams: {
        recordPerPage: this.recordPerPage,
        pageNo: pageNo
      }
    })
  }

  reloadPageNoOptions(){
    var pageNoOptionCount = Math.ceil(this.totalRecords / this.recordPerPage)
    this.pageNoOptions = Array(pageNoOptionCount).fill(0).map((x,i)=>i+1);
  }

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

  clearSelectedUser(event:Event){
    event.preventDefault()
    this.selectedUserList = []
    var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    allCheckbox.checked = false
      allCheckbox.indeterminate = false
  }

  toggelUserSelect(event: Event, branch: IBranch) {
    var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedUserList.push(branch)
    } else {
      this.selectedUserList = this.selectedUserList.filter((userInList) => userInList != branch)
    }
    if (this.selectedUserList.length == this.filteredList.length) {
      allCheckbox.checked = true
      allCheckbox.indeterminate = false
    } else if (this.selectedUserList.length != 0) {
      allCheckbox.indeterminate = true
      allCheckbox.checked = false
    } else {
      allCheckbox.checked = false
      allCheckbox.indeterminate = false
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

  deleteSeletedRecords() {
    this.alertService.setAlert({
      title: 'Are you sure you want to delete the selected record?',
      msg: 'Note: Any associated Activities, Visits, Drafts will also be Deleted',
      okBtnColor: Color.danger,
      okBtnText: BtnText.delete,
      cancelBtnText: BtnText.cancel
    })
    this.alertService.onActionClicked.pipe(first()).subscribe(async value => {
      if (value) {
        var ids = this.selectedUserList.map(user => user.id)
        if(ids.includes(this.user.branchId)){
          var defaultBranch = this.branchList.find(b => b.id == this.user.branchId)
          this.msgService.setColor(this.msgBoxId, Color.danger)
          this.msgService.setMsg(this.msgBoxId, `${defaultBranch?.branchName} can't be deleted as it is default branch`)
          this.msgService.openMsgBox(this.msgBoxId)
          return
        }
        console.log(ids)
        this.apiService.delete(API.REMOVE_BRANCHE_RANGE, {
          headers: await this.authService.getAuthorizationHeader(),
          body :ids
        }
        ).subscribe(
          (response) => {
            if (response) {
              console.log(response)
              this.selectedUserList = []
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, `Branches deleted successfully`)
              this.msgService.openMsgBox(this.msgBoxId)
              var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
              allCheckbox.checked = false
              allCheckbox.indeterminate = false
              this.getbranches()
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }
    })
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
      headers: await this.authService.getAuthorizationHeader(),
      params: {
        pageSize: this.recordPerPage,
        pageNo: this.pageNo,
      },
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.totalRecords = response.data.totalRecords
          this.reloadPageNoOptions()
          this.branchList = response.data.records
          this.filteredList = this.branchList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
