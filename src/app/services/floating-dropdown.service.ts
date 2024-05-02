import { Injectable } from '@angular/core';

interface IFloatingDropdown {
  Id: string
  Visible: boolean,
  top: number,
  left: number
}

@Injectable({
  providedIn: 'root'
})
export class FloatingDropdownService {

  private FDs: IFloatingDropdown[] = [];

  constructor() { }

  register(Id: string) {
    this.FDs.push({
      Id: Id,
      Visible: false,
      top: 0,
      left: 0
    })
  }

  unregister(Id: string) {
    this.FDs = this.FDs.filter(element => element.Id !== Id)
  }

  getInstace(Id : string){
    return this.FDs.find(element => element.Id == Id)
  }

  isFloatingDropdownOpen(Id: string): boolean {
    return Boolean(this.FDs.find(element => element.Id === Id)?.Visible)
  }

  toggeleFloatingDropdown(Id: string, top?: number, left?: number) {
    var FD = this.FDs.find(element => element.Id === Id)
    if (FD) {
      if (top && left) {
        FD.top = top;
        FD.left = left
      }
      FD.Visible = !FD.Visible
    }

  }
}
