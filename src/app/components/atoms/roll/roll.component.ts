import { Component, Input } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-roll',
    imports: [IconComponent, CommonModule],
    templateUrl: './roll.component.html',
    styleUrl: './roll.component.scss'
})
export class RollComponent {

  @Input({ required: true }) type: string;
  @Input() mainValue: string;
  @Input() iconName: string;
  @Input() altValue: string;

  constructor() {
    this.type = '';
    this.mainValue = '';
    this.iconName = 'Dice6';
    this.altValue = '';
  }
}
