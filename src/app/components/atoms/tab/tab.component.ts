import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() title: string;
  @Output() onSelect = new EventEmitter<void>();
  @Input() selected: boolean;

  constructor() {
    this.title = '';
    this.selected = false;
  }

  handleClick() {
    this.onSelect.emit();
  }
}
