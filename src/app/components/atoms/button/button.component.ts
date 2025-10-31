import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() leftIcon: string;
  @Input() text: string;
  @Input() rightIcon: string;
  @Input() type: string;

  constructor() {
    this.leftIcon = '';
    this.text = '';
    this.rightIcon = '';
    this.type = 'empty';
  }
}
