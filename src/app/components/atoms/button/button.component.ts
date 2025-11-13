import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type ButtonType = 'empty' | 'accent' | 'secondary';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [IconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() leftIcon: string;
  @Input() text: string;
  @Input() rightIcon: string;
  @Input() type: ButtonType;
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
    this.leftIcon = '';
    this.text = '';
    this.rightIcon = '';
    this.type = 'empty';
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
