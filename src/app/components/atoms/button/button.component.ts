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
  @Input() class: string;
  @Output() buttonClick = new EventEmitter<void>();

  constructor() {
    this.leftIcon = '';
    this.text = '';
    this.rightIcon = '';
    this.type = 'empty';
    this.class = '';
  }

  get buttonClasses(): string[] {
    const classes: string[] = [this.type];
    if (this.class) {
      // Split by space to handle multiple classes
      const additionalClasses = this.class.trim().split(/\s+/).filter(c => c.length > 0);
      classes.push(...additionalClasses);
    }
    return classes;
  }

  onClick(): void {
    this.buttonClick.emit();
  }
}
