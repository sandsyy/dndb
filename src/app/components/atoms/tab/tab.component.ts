import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent {
  @Input() title: string;
  @Input() selected: boolean = false;
  @Input() disabled: boolean = false;

  constructor() {
    this.title = '';
  }
}
