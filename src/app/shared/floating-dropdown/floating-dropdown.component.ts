import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FloatingDropdownService } from 'src/app/services/floating-dropdown.service';

@Component({
  selector: 'app-floating-dropdown',
  templateUrl: './floating-dropdown.component.html',
  styleUrls: ['./floating-dropdown.component.css']
})
export class FloatingDropdownComponent implements OnInit, OnDestroy{

  @Input() floatingDropdownId  = "";

 

  constructor( public floatingDropdown : FloatingDropdownService, public el : ElementRef){}
  
  ngOnInit(): void {
      document.body.appendChild(this.el.nativeElement)
      this.floatingDropdown.register(this.floatingDropdownId)

  }

  ngOnDestroy(): void {
      document.body.removeChild(this.el.nativeElement)
      this.floatingDropdown.unregister(this.floatingDropdownId)
    }

    ngOnChanges(changes: SimpleChanges): void {
      console.log("called")
      var floatingDropdownInstace = this.floatingDropdown.getInstace(this.floatingDropdownId)
      console.log(floatingDropdownInstace)
      // console.log(floatingDropdownInstace?.left)
        var dropdown = document.getElementById(`floatinfDropdown-${this.floatingDropdownId}`)
        console.log(dropdown)
        dropdown!.style.top = floatingDropdownInstace!.top+'px'
        dropdown!.style.left = floatingDropdownInstace!.left+'px'
    }


  closeFloatingDropdown(){
    this.floatingDropdown.toggeleFloatingDropdown(this.floatingDropdownId)
  }
}
