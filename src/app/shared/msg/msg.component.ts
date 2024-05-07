import { Call } from '@angular/compiler';
import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MsgService } from 'src/app/services/msg.service';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit, OnDestroy {
  @Input() MsgBoxId = ""
  isCloseing = false
  closeCall = true

  constructor(public msgService: MsgService) {

  }

  ngOnInit(): void {
    this.msgService.register(this.MsgBoxId)

  }

  ngOnDestroy(): void {
    this.msgService.unregister(this.MsgBoxId)
  }

  get bgColor() {
    if(this.closeCall){
      this.closeMsgBoxAfterTiming()
      this.closeCall = false
    }
    return `bg-${this.msgService.getColor(this.MsgBoxId)}`
  }

  closeMsgBoxAfterTiming() {
    console.log("Call")
    setTimeout(() => {
      this.closeMsgBox()
    }, 5000);
  }

  closeMsgBox() {
    console.log("called")
    this.isCloseing = true;
    setTimeout(() => {
      this.isCloseing = false;
      this.msgService.closeMsgBox(this.MsgBoxId)
      this.closeCall = true
    }, 450);
  }
}
