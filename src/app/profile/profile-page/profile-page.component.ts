import { Component,ElementRef,OnInit, ViewChild } from '@angular/core';
import { FloatingModalService } from 'src/app/services/floating-modal.service';
import { Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import IUser from 'src/app/model/User.model';
import { FloatingDropdownService } from 'src/app/services/floating-dropdown.service';
import { Gender } from 'src/assets/static/Gender';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent{
  @ViewChild('nameField') nameField!: ElementRef;
  user: IUser
  addNumberFloatingModalId = "addNumberFloatingModalId"
  genderDropDownId = "genderDropDownId"
  isEditable = false

  name = new FormControl('',[
    Validators.required
  ])
  gender = new FormControl('',[
    Validators.required
  ])
  mobilenumber = new FormControl('',
    [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
  

  genderOptions :Gender[]= []
    
    
  constructor(
    private route: ActivatedRoute,
    private floatingModal : FloatingModalService,
    private floatingDropdown : FloatingDropdownService
  ) {
    this.user = this.route.snapshot.data['user'];
    console.log(this.user)
    this.name.setValue(this.user.name)
    this.gender.setValue(this.user.gender)
    this.gender.disable()
    this.name.disable()
    this.genderOptions = [
      Gender.Male,
      Gender.Female,
      Gender.Other,
      Gender.NotToSay,
    ]
  }

  openPhoneNumberForm(event : Event){
    event.preventDefault()
    this.floatingModal.openFloatingModal(this.addNumberFloatingModalId)
    console.log(this.floatingModal.isFloatingModalOpen(this.addNumberFloatingModalId))
  }

  enableEdit(){
    this.gender.enable()
    this.name.enable()
    this.isEditable = true
    this.nameField.nativeElement.focus()
  }

  disableEdit(event? : Event){
    if(event){
      event.preventDefault()
    }
    this.gender.disable()
    this.name.disable()
    this.isEditable = false
  }

  openFloatingDropdown(event: Event, id: string) {
    event.preventDefault();
    this.floatingDropdown.toggeleFloatingDropdown(id)
  }

  changeGander(genderOpt : Gender){
    this.gender.setValue(genderOpt)
  }

}

