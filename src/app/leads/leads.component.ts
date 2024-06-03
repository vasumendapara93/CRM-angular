import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadFileComponent } from '../shared/upload-file/upload-file.component';
import IUser from '../model/User.model';
import { MappingFields } from 'src/assets/static/MappingFields';
import { Order } from 'src/assets/static/Order';
import { TableColumns } from 'src/assets/static/TableColumns';
import { Subject, debounceTime, first } from 'rxjs';
import { APIService } from '../services/api.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { API } from 'src/assets/static/API';
import { BtnText } from 'src/assets/static/BtnText';
import { Color } from 'src/assets/static/Color';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { FloatingDropdownService } from '../services/floating-dropdown.service';
import { FloatingModalService } from '../services/floating-modal.service';
import { MsgService } from '../services/msg.service';
import ILead from '../model/Lead.model';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent  implements OnInit {

  @ViewChild('uploadFileComponent') uploadFileComponent!: UploadFileComponent;

  pageTitle = 'Leads'
  leadList: ILead[] = []
  filteredList: ILead[] = []
  selectedLeadList: ILead[] = []
  filterText: string = ""
  totalRecords = 0
  recordPerPage = 10
  pageNoShowLimit = 3
  pageNoShowOptions: number[] = []
  pageNo: number = 1
  searchString = ''
  orderBy: string | null = null
  order: string | null = null
  recordPerPageOptions = [10, 20, 30, 50, 75, 100]
  pageNoOptions: number[] = []
  user: IUser = {} as IUser
  mappingFields = MappingFields
  private inputSearch = new Subject<string>();
  Order = Order
  tableColumns = TableColumns.LeadColumns
  detailLead: ILead | undefined
  detailLeadId: string | null = null

  addLeadId = "add-lead"
  leadActionDropdownId = 'leadActionDropdownId'
  leadRecordPerPageId = 'leadRecordPerPageId'

  addLeadFloatingModalId = 'addLeadFloatingModalId'
  editLeadFloatingModalId = 'editLeadFloatingModalId'
  addLeadCSVFloatingModalId = "addLeadCSVFloatingModalId"

  msgBoxId = 'LeadMsgBoxId'
  uploadBoxId = 'uploadFileMsgBoxID'

  isCreatingNewLead = false
  isEditingLead = false
  showBlockPanel: boolean = false;
  isResendingActivationRequest = false
  isDeletingLead = false

  API = API

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
    this.route.parent!.data.subscribe((data: { [x: string]: IUser; }) => {
      this.user = data['user'];
      console.log(this.user)
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.pageNo = params['pageNo'] ?? 1
      this.recordPerPage = params['recordPerPage'] ?? 10
      this.orderBy = params['orderBy'] ?? null
      if (this.order) {
        this.order = params['order'] ?? Order.ASC
      } else {
        this.order = params['order'] ?? null
      }
      if (params['lead']) {
        if (this.detailLeadId == params['lead'] || this.leadList.length == 0) {
          this.getLeads()
          this.detailLeadId = params['lead']
          if (this.detailLeadId != undefined) {
            this.getLeadDetail()
          }
        } else {
          this.detailLeadId = params['lead']
          if (this.detailLeadId != undefined && this.detailLeadId != null) {
            this.getLeadDetail()
          }
        }
      } else {
        this.getLeads()
      }
    })

    this.inputSearch.pipe(debounceTime(1000)).subscribe(() => {
      this.getLeads()
    });

  }

  name = new FormControl('',
    [
      Validators.required,
    ])
  email = new FormControl('',
    [
      Validators.required,
      Validators.email

    ])
  phoneNumber = new FormControl('',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ])
  contactPerson = new FormControl('',
    [
      Validators.required
    ])
  id = new FormControl('',
    [
      Validators.required
    ])

  newOrganizationForm = new FormGroup({
    name: this.name,
    email: this.email,
    phoneNumber: this.phoneNumber,
    contactPerson: this.contactPerson
  })

  openBlockPanel() {
    this.showBlockPanel = true;
  }

  closeBlockPanel() {
    this.showBlockPanel = false;
    this.detailLeadId = null
    this.router.navigate([],
      {
        queryParams: {
          recordPerPage: this.recordPerPage,
          pageNo: this.pageNo,
          orderBy: this.orderBy,
          order: this.order,
        }
      })
  }

  showDetail(id: string | null) {
    this.router.navigate([],
      {
        queryParams: {
          lead: id,
          recordPerPage: this.recordPerPage,
          pageNo: this.pageNo,
          orderBy: this.orderBy,
          order: this.order,
        }
      })
  }

  async getLeadDetail() {
    try {
      this.apiService.get(API.GET_LEAD, {
        params: {
          id: this.detailLeadId
        },
        headers: await this.authService.getAuthorizationHeader()
      }
      ).subscribe(
        (response) => {
          console.log(response)
          if (response.isSuccess) {
            this.detailLead = response.data
            this.openBlockPanel()
          }
        },
        (error) => {
          console.log(error)
          this.msgService.setColor(this.msgBoxId, Color.danger)
          if (error.error.errorMessages && error.error.errorMessages[0] && error.error.errorMessages[0] != "") {
            this.msgService.setMsg(this.msgBoxId, error.error.errorMessages[0])
          } else {
            this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong With This Lead Try Again Later')
          }
          this.msgService.openMsgBox(this.msgBoxId)
        }
      )
    } catch (e) {
      console.log(e)
      this.msgService.setColor(this.msgBoxId, Color.danger)
      this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
      this.msgService.openMsgBox(this.msgBoxId)
    }
  }

  changeRecordPerPage(recordPerPage: number) {
    this.pageNoShowOptions = []
    this.router.navigate([],
      {
        queryParams: {
          user: this.detailLeadId,
          recordPerPage: recordPerPage,
          pageNo: 1,
          orderBy: this.orderBy,
          order: this.order
        }
      })
  }
  changePageNo(pageNo: number) {
    this.router.navigate([],
      {
        queryParams: {
          user: this.detailLeadId,
          recordPerPage: this.recordPerPage,
          pageNo: pageNo,
          orderBy: this.orderBy,
          order: this.order
        }
      })
  }

  onPrevious(pageNo: number) {

    if (this.pageNo <= 1) {
      return
    }
    if (this.pageNo == this.pageNoShowOptions[0] && this.pageNo != this.pageNoOptions[1]) {
      this.pageNoShowOptions.unshift(Number(pageNo) - 1)
      if (this.pageNoShowOptions.length > this.pageNoShowLimit) {
        this.pageNoShowOptions.pop()
      }
      this.changePageNo(Number(pageNo) - 1)
    } else {
      this.changePageNo(Number(pageNo) - 1)
    }
  }

  onNext(pageNo: number) {
    if (this.pageNo >= this.pageNoOptions.length) {
      return
    }
    if (this.pageNo == this.pageNoShowOptions[this.pageNoShowOptions.length - 1] && this.pageNo != this.pageNoOptions[this.pageNoOptions.length - 2]) {
      this.pageNoShowOptions.push(Number(pageNo) + 1)
      if (this.pageNoShowOptions.length > this.pageNoShowLimit) {
        this.pageNoShowOptions.shift()
      }
      this.changePageNo(Number(pageNo) + 1)
    } else {
      this.changePageNo(Number(pageNo) + 1)
    }
  }

  sortData(orderBy: string | null, order: string | null) {
    this.router.navigate([],
      {
        queryParams: {
          user: this.detailLeadId,
          recordPerPage: this.recordPerPage,
          pageNo: this.pageNo,
          orderBy: orderBy,
          order: order
        }
      })
  }

  reloadPageNoOptions() {
    var pageNoOptionCount = Math.ceil(this.totalRecords / this.recordPerPage)
    this.pageNoOptions = Array(pageNoOptionCount).fill(0).map((x, i) => i + 1);
    if (this.pageNoShowOptions.length == 0 ||
      this.pageNo == this.pageNoOptions[0] ||
      this.pageNo == this.pageNoOptions[1] ||
      this.pageNo == this.pageNoOptions[2]
    ) {
      this.pageNoShowOptions = []
      for (let i = 1; i <= this.pageNoShowLimit; i++) {
        if (this.pageNoOptions[i]) {
          this.pageNoShowOptions.push(this.pageNoOptions[i])
        }
      }
    } else if (this.pageNo == this.pageNoOptions[this.pageNoOptions.length - 1] ||
      this.pageNo == this.pageNoOptions[this.pageNoOptions.length - 2] ||
      this.pageNo == this.pageNoOptions[this.pageNoOptions.length - 3] ||
      this.pageNo == this.pageNoOptions[this.pageNoOptions.length - 4]
    ) {
      this.pageNoShowOptions = []
      for (let i = 1; i <= this.pageNoShowLimit; i++) {
        if (this.pageNoOptions[(this.pageNoOptions.length - 1) - i]) {
          this.pageNoShowOptions.unshift(this.pageNoOptions[(this.pageNoOptions.length - 1) - i])
        }
      }
    } else if (this.pageNoShowOptions.length == 0) {
      this.pageNoShowOptions = []
      let i = this.pageNoOptions.indexOf(Number(this.pageNo))
      if (this.pageNoOptions[i - 1]) {
        this.pageNoShowOptions.push(this.pageNoOptions[i - 1])
      }
      this.pageNoShowOptions.push(this.pageNoOptions[i])
      if (this.pageNoOptions[i + 1]) {
        this.pageNoShowOptions.push(this.pageNoOptions[i + 1])
      }
    }
    console.log(this.pageNoShowOptions)
  }

  number(x: number | string) {
    return Number(x)
  }

  openAddLeadForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addLeadFloatingModalId)
    this.newOrganizationForm.reset()
    console.log(this.floatingModal.isFloatingModalOpen(this.addLeadFloatingModalId))
  }

  openEditLeadForm(Lead: ILead) {
    this.floatingModal.openFloatingModal(this.editLeadFloatingModalId)
    // this.name.setValue(user.name)
    // this.email.setValue(user.email)
    // this.id.setValue(user.id)
  }

  openAddLeadCSVForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addLeadCSVFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addLeadCSVFloatingModalId))
  }

  clearSelectedLead(event: Event) {
    event.preventDefault()
    this.selectedLeadList = []
    var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    allCheckbox.checked = false
    allCheckbox.indeterminate = false
  }

  toggelLeadSelect(event: Event, lead: ILead) {
    var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedLeadList.push(lead)
    } else {
      this.selectedLeadList = this.selectedLeadList.filter((leadInList) => leadInList != lead)
    }
    if (this.selectedLeadList.length == this.filteredList.length) {
      allCheckbox.checked = true
      allCheckbox.indeterminate = false
    } else if (this.selectedLeadList.length != 0) {
      allCheckbox.indeterminate = true
      allCheckbox.checked = false
    } else {
      allCheckbox.checked = false
      allCheckbox.indeterminate = false
    }
    console.log(this.selectedLeadList)
  }

  toggelAllLeadSelection(event: Event) {
    var checkbox = event.target as HTMLInputElement
    if (checkbox.checked) {
      this.selectedLeadList = this.filteredList
    }
    if (!checkbox.checked) {
      this.selectedLeadList = []
    }
  }

  filterData(event: Event) {
    event.preventDefault();
    var searchInputField = event.target as HTMLInputElement
    if (this.searchString == searchInputField.value) {
      return
    }
    this.searchString = searchInputField.value
    this.inputSearch.next(this.searchString)
  }

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  deleteSeletedRecords() {
    this.alertService.setAlert({
      title: 'Are you sure you want to delete the selected organizations?',
      msg: 'Note: Any associated Activities, Visits, Drafts will also be Deleted',
      okBtnColor: Color.danger,
      okBtnText: BtnText.delete,
      cancelBtnText: BtnText.cancel
    })
    this.alertService.onActionClicked.pipe(first()).subscribe(async (value: any) => {
      if (value) {
        var ids = this.selectedLeadList.map(lead => lead.id)
        this.apiService.delete(API.REMOVE_ORGANIZATION_RANGE, {
          headers: await this.authService.getAuthorizationHeader(),
          body: ids
        }
        ).subscribe(
          (response) => {
            if (response) {
              console.log(response)
              this.selectedLeadList = []
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, `Organizations deleted successfully`)
              this.msgService.openMsgBox(this.msgBoxId)
              var allCheckbox = document.getElementById('AllOrgCheckbox') as HTMLInputElement
              allCheckbox.checked = false
              allCheckbox.indeterminate = false
              if (this.pageNo != 1) {
                this.changePageNo(1)
              } else {
                this.getLeads()
              }
            }
          },
          (error) => {
            console.log(error)
          }
        )
      }
    })
  }

  async editLead(event: Event) {
    event.preventDefault()
    if (this.newOrganizationForm.valid) {
      this.isEditingLead = true
      try {
        this.apiService.put(API.UPDATE_USER + '/' + this.id.value,
          {
            name: this.name.value,
            email: this.email.value
          }, {
          headers: await this.authService.getAuthorizationHeader()
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Lead Edited Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.floatingModal.closeFloatingModal(this.editLeadFloatingModalId)
              this.getLeads()
              this.newOrganizationForm.reset()
            }
            this.isEditingLead = false
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

  async createNewLead() {
    if (this.newOrganizationForm.valid) {
      this.isCreatingNewLead = true
      try {
        this.apiService.post(API.CREATE_ORGANIZATION,
          {
            name: this.name.value,
            email: this.email.value,
            phoneNumber: this.phoneNumber.value,
            contactPerson: this.contactPerson.value
          }, {
          headers: await this.authService.getAuthorizationHeader()
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Organization Create Request Sent Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.floatingModal.closeFloatingModal(this.addLeadFloatingModalId)
              this.getLeads()
              this.newOrganizationForm.reset()
            }
            this.isCreatingNewLead = false
          },
          (error) => {
            console.log(error)
            this.msgService.setColor(this.msgBoxId, Color.danger)
            if (error.error.errorMessages && error.error.errorMessages[0] && error.error.errorMessages[0] != "") {
              this.msgService.setMsg(this.msgBoxId, error.error.errorMessages[0])
            } else {
              this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            }
            this.msgService.openMsgBox(this.msgBoxId)

            this.isCreatingNewLead = false
          }
        )
      } catch (e) {
        console.log(e)
        this.msgService.setColor(this.msgBoxId, Color.danger)
        this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
        this.msgService.openMsgBox(this.msgBoxId)
        this.isCreatingNewLead = false
      }
    }
  }

  async createLeadRange(emitedList: { [key: string]: any }[]) {
    var newLeadList: IUser[] = []
    emitedList.forEach(item => {
      item['organizationId'] = this.user.organizationId
      item['dataEnteryOpratorId'] = this.user.id
      newLeadList.push(item as IUser)
    })
    console.log(newLeadList)
    this.apiService.post(API.CREATE_LEAD_RANGE, newLeadList, {
      headers: await this.authService.getAuthorizationHeader()
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response) {
          this.msgService.setColor(this.msgBoxId, Color.success)
          this.msgService.setMsg(this.msgBoxId, 'Leads Created Successfully')
          this.msgService.openMsgBox(this.msgBoxId)
          this.getLeads()
          this.floatingModal.closeFloatingModal(this.addLeadCSVFloatingModalId)
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

  async deleteLead(id: string) {
    this.isDeletingLead = true
    this.alertService.setAlert({
      title: 'Are you sure you want to delete the Lead?',
      msg: 'Note: Any associated Activities, Visits, Drafts will also be Deleted and can\'t be recovered',
      okBtnColor: Color.danger,
      okBtnText: BtnText.delete,
      cancelBtnText: BtnText.cancel
    })
    this.alertService.onActionClicked.pipe(first()).subscribe(async (value: any) => {
      if (value) {
        try {
          this.apiService.delete(API.DELETE_ORGANIZATION + '/' + id, {
            headers: await this.authService.getAuthorizationHeader()
          }
          ).subscribe(
            (response) => {
              console.log(response)
              if (response.isSuccess) {
                this.msgService.setColor(this.msgBoxId, Color.success)
                this.msgService.setMsg(this.msgBoxId, 'Lead Deleted Successfully')
                this.msgService.openMsgBox(this.msgBoxId)
                this.showDetail(null)
                this.closeBlockPanel()
              }
              this.isDeletingLead = false
            },
            (error) => {
              console.log(error)
              this.msgService.setColor(this.msgBoxId, Color.danger)
              if (error.error.errorMessages && error.error.errorMessages[0] && error.error.errorMessages[0] != "") {
                this.msgService.setMsg(this.msgBoxId, error.error.errorMessages[0])
              } else {
                this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
              }
              this.msgService.openMsgBox(this.msgBoxId)

              this.isDeletingLead = false
            }
          )
        } catch (e) {
          console.log(e)
          this.msgService.setColor(this.msgBoxId, Color.danger)
          this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
          this.msgService.openMsgBox(this.msgBoxId)
          this.isDeletingLead = false
        }
      }
    })
  }

  async getLeads() {
    this.apiService.get(API.GET_LEADS + '/' + this.user.organizationId,  {
      headers: await this.authService.getAuthorizationHeader(),
      params: {
        search: this.searchString,
        orderBy: this.orderBy,
        order: this.order,
        pageSize: this.recordPerPage,
        pageNo: this.pageNo
      },
    }
    ).subscribe(
      (response) => {
        console.log(response)
        if (response.data) {
          console.log(response.data)
          this.totalRecords = response.data.totalRecords
          this.reloadPageNoOptions()
          this.leadList = response.data.records
          this.filteredList = this.leadList
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
