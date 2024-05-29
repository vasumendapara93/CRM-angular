import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-sliding-modal',
  templateUrl: './sliding-modal.component.html',
  styleUrls: ['./sliding-modal.component.css']
})
export class SlidingModalComponent implements OnInit, OnDestroy {
  @Input() title: string = ''
  @Output() close = new EventEmitter<void>();
  closing: boolean = false;

  ngOnInit() {
    document.addEventListener('keydown', this.handleEscape, false);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleEscape, false);
  }

  handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closePanel();
    }
  };

  closePanel() {
    this.closing = true;
    setTimeout(() => {
      this.close.emit();
    }, 450); // Match this duration with the slide-out animation duration
  }
}
