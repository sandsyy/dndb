import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-roll',
    standalone: true,
    imports: [IconComponent, CommonModule],
    templateUrl: './roll.component.html',
    styleUrls: ['./roll.component.scss']
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
