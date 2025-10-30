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
  @Input() rightIcon: string;

  constructor() {
    this.leftIcon = '';
    this.rightIcon = '';
  }
}
