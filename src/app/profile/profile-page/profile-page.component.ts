import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FloatingModalService } from 'src/app/services/floating-modal.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import IUser from 'src/app/model/User.model';
import { FloatingDropdownService } from 'src/app/services/floating-dropdown.service';
import { Gender } from 'src/assets/static/Gender';
import { APIService } from 'src/app/services/api.service';
import { API } from 'src/assets/static/API';
import { AuthService } from 'src/app/services/auth.service';
import { MsgService } from 'src/app/services/msg.service';
import { Color } from 'src/assets/static/Color';
import { PatchOprations } from 'src/assets/static/PatchOpratins';
import { UserFields } from 'src/assets/static/UserFields';
import { ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, first } from 'rxjs';
import { BtnText } from 'src/assets/static/BtnText';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  @ViewChild('nameField') nameField!: ElementRef;
  user: IUser = {} as IUser
  addNumberFloatingModalId = "addNumberFloatingModalId"
  genderDropDownId = "genderDropDownId"
  profilePictureDropDownId = "profilePictureDropDownId"
  msgBoxId = "profileMsgBoxId"
  profileImageCropModalId = 'profileImageCropModalId'
  isEditable = false
  isUpdatingPhone = false
  isUpdatingInfo = false
  isUpdatingImage = false
  file: File | null = null
  allowedFileTypes: string[] = [
    'image/jpeg',
    'image/jpg',
    'image/bmp',
  ]
  imageChangedEvent: Event | null = null
  transform: ImageTransform = {
    translateUnit: 'px'
  };
  canvasRotation = 0
  zoom = 0
  croppedImageBlob: any = '';
  API = API

  name = new FormControl('', [
    Validators.required
  ])
  gender = new FormControl('', [
    Validators.required
  ])
  mobilenumber = new FormControl('',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ])


  genderOptions: Gender[] = []


  constructor(
    private route: ActivatedRoute,
    private floatingModal: FloatingModalService,
    private floatingDropdown: FloatingDropdownService,
    private apiService: APIService,
    private authService: AuthService,
    private msgService: MsgService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.route.parent!.data.subscribe(data => {
      this.user = data['user'];
      console.log(this.user)
      this.name.setValue(this.user.name)
      this.gender.setValue(this.user.gender)
    });
    this.gender.disable()
    this.name.disable()
    this.genderOptions = [
      Gender.Male,
      Gender.Female,
      Gender.Other,
      Gender.NotToSay,
    ]

  }

  mobileFormGroup = new FormGroup({
    mobilenumber: this.mobilenumber
  })

  userinfoForm = new FormGroup({
    name: this.name,
    gender: this.gender
  })

  openPhoneNumberForm(event: Event) {
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addNumberFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addNumberFloatingModalId))
  }

  enableEdit() {
    this.gender.enable()
    this.name.enable()
    this.isEditable = true
    this.nameField.nativeElement.focus()
  }

  disableEdit(event?: Event) {
    if (event) {
      event.preventDefault()
    }
    this.gender.setValue(this.user.gender)
    this.name.setValue(this.user.name)
    this.gender.disable()
    this.name.disable()
    this.isEditable = false
  }

  openFloatingDropdown(event: Event, id: string) {
    if (id == this.genderDropDownId && !this.isEditable) {
      return
    }
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  changeGander(genderOpt: Gender) {
    this.gender.setValue(genderOpt)
  }

  async updatePhoneNumber(event: Event) {
    event.preventDefault()
    if (this.mobileFormGroup.valid) {
      try {
        this.isUpdatingPhone = true
        this.apiService.patch(API.UPDATE_USER + '/' + this.user.id,
          [
            {
              op: PatchOprations.Replace,
              path: "/" + UserFields.PhoneNumber.fieldName,
              value: this.mobilenumber.value
            }
          ], {
          headers: await this.authService.getAuthorizationHeader()
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Mobile No. Added Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.floatingModal.closeFloatingModal(this.addNumberFloatingModalId)
              this.mobileFormGroup.reset()
              this.authService.getUser(this.user.id).then((user) => {
                (this.route.parent!.data as BehaviorSubject<any>).next({ user : user})
              })
            }
            this.isUpdatingPhone = false
          },
          (error) => {
            console.log(error)
            this.msgService.setColor(this.msgBoxId, Color.danger)
            this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            this.msgService.openMsgBox(this.msgBoxId)
            this.isUpdatingPhone = false
          }
        )
      } catch (e) {
        console.log(e)
        this.isUpdatingPhone = false
      }
    }
  }

  clearValue() {
    var imageinput = document.getElementById('imageinput') as HTMLInputElement
    imageinput.value = ''
    this.canvasRotation = 0
    this.zoom = 0

  }

  openImageInput(event: Event) {
    event.preventDefault()
    var imageinput = document.getElementById('imageinput')
    imageinput?.click()
  }

  onImageSelect(event: Event) {
    event.preventDefault()
    this.file = (event.target as HTMLInputElement).files?.item(0) ?? null
    console.log(this.file!.type)
    if (!this.file || !this.allowedFileTypes.includes(this.file.type)) {
      this.msgService.setColor(this.msgBoxId, Color.danger)
      this.msgService.setMsg(this.msgBoxId, `Only .jpg or .jpeg File Type Allowed`)
      this.msgService.openMsgBox(this.msgBoxId)
      return
    }
    this.imageChangedEvent = event
    this.floatingModal.openFloatingModal(this.profileImageCropModalId)
  }

  onZoomChange(event: Event) {
    event.preventDefault()
    console.log(Number((event.target as HTMLInputElement).value))
    this.zoom = Number((event.target as HTMLInputElement).value) / 100
    this.transform = {
      ...this.transform,
      scale: this.zoom
    };
  }

  leftRotate() {
    this.canvasRotation--
  }

  rightRotate() {
    this.canvasRotation++
  }


  imageCropped(event: ImageCroppedEvent) {
    console.log(event)
    this.croppedImageBlob = event.blob
    console.log(this.croppedImageBlob);
  }

  async updateprofileImage(event: Event) {
    event.preventDefault()
    if (this.croppedImageBlob && this.file) {
      const imageFile = new File([this.croppedImageBlob], this.file!.name, {
        type: this.croppedImageBlob.type,
      });
      let formData: FormData = new FormData();
      formData.append('imageFile', imageFile)
      try {
        this.isUpdatingImage = true
        this.apiService.post(API.UPDATE_USER_PROFILE_PICTURE + '/' + this.user.id,
          formData,
          {
            headers: await this.authService.getAuthorizationHeader()
          }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Profile Picture Updated Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.authService.getUser(this.user.id).then((user) => {
                (this.route.parent!.data as BehaviorSubject<any>).next({ user : user})
                this.floatingModal.closeFloatingModal(this.profileImageCropModalId)
              })
            } else {
              this.msgService.setColor(this.msgBoxId, Color.danger)
              this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
              this.msgService.openMsgBox(this.msgBoxId)
            }
            this.isUpdatingImage = false
          },
          (error) => {
            console.log(error)
            this.msgService.setColor(this.msgBoxId, Color.danger)
            this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            this.msgService.openMsgBox(this.msgBoxId)
            this.isUpdatingImage = false
          }
        )
      } catch (e) {
        console.log(e)
        this.isUpdatingImage = false
      }
    }

  }

  resetImageCrop(event: Event) {
    event.preventDefault()
    this.canvasRotation = 0
    this.zoom = 0

    this.transform = {
      ...this.transform,
      scale: this.zoom
    };

    var slider = document.getElementById('zoomSlider') as HTMLInputElement
    slider.value = '0'
  }

  async removeProfilePicture(event: Event) {
    event.preventDefault()
    this.alertService.setAlert({
      title: 'Remove Profile Picture?',
      msg: 'Note: The people who can view your profile picture currently may find it difficult to identify you without it.',
      okBtnColor: Color.danger,
      okBtnText: BtnText.remove,
      cancelBtnText: BtnText.cancel
    })
    this.alertService.onActionClicked.pipe(first()).subscribe(async value => {
      if (value) {
        try {
          this.isUpdatingImage = true
          this.apiService.delete(API.UPDATE_USER_PROFILE_PICTURE + '/' + this.user.id,
            {
              headers: await this.authService.getAuthorizationHeader()
            }
          ).subscribe(
            (response) => {
              console.log(response)
              if (response.isSuccess) {
                this.msgService.setColor(this.msgBoxId, Color.success)
                this.msgService.setMsg(this.msgBoxId, 'Profile Picture Removed Successfully')
                this.msgService.openMsgBox(this.msgBoxId)
                this.authService.getUser(this.user.id).then((user) => {
                  (this.route.parent!.data as BehaviorSubject<any>).next({ user : user})
                })
              } else {
                this.msgService.setColor(this.msgBoxId, Color.danger)
                this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
                this.msgService.openMsgBox(this.msgBoxId)
              }
              this.isUpdatingImage = false
            },
            (error) => {
              console.log(error)
              this.msgService.setColor(this.msgBoxId, Color.danger)
              this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
              this.msgService.openMsgBox(this.msgBoxId)
              this.isUpdatingImage = false
            }
          )
        } catch (e) {
          console.log(e)
          this.isUpdatingImage = false
        }
      }
    })

  }

  async updateUserInfo(event: Event) {
    event.preventDefault()
    if (this.userinfoForm.valid) {
      try {
        this.isUpdatingInfo = true
        this.apiService.patch(API.UPDATE_USER + '/' + this.user.id,
          [
            {
              op: PatchOprations.Replace,
              path: "/" + UserFields.Gender.fieldName,
              value: this.gender.value
            },
            {
              op: PatchOprations.Replace,
              path: "/" + UserFields.Name.fieldName,
              value: this.name.value
            }
          ], {
          headers: await this.authService.getAuthorizationHeader()
        }
        ).subscribe(
          (response) => {
            console.log(response)
            if (response.isSuccess) {
              this.msgService.setColor(this.msgBoxId, Color.success)
              this.msgService.setMsg(this.msgBoxId, 'Info Updated Successfully')
              this.msgService.openMsgBox(this.msgBoxId)
              this.floatingModal.closeFloatingModal(this.addNumberFloatingModalId)
              this.mobileFormGroup.reset()
              this.authService.getUser(this.user.id).then((user) => {
                (this.route.parent!.data as BehaviorSubject<any>).next({ user : user})
                this.disableEdit()
              })
            } else {
              this.msgService.setColor(this.msgBoxId, Color.danger)
              this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
              this.msgService.openMsgBox(this.msgBoxId)
            }
            this.isUpdatingInfo = false
          },
          (error) => {
            console.log(error)
            this.msgService.setColor(this.msgBoxId, Color.danger)
            this.msgService.setMsg(this.msgBoxId, 'Somthing Is Wrong Try Again Later')
            this.msgService.openMsgBox(this.msgBoxId)
            this.isUpdatingInfo = false
          }
        )
      } catch (e) {
        console.log(e)
        this.isUpdatingInfo = false
      }
    }
  }

}

