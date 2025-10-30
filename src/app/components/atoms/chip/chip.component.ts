import { Component, Input } from '@angular/core';
import { RollComponent } from '../roll/roll.component';

@Component({
    selector: 'app-chip',
    imports: [RollComponent],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.scss'
})
export class ChipComponent {

  @Input() content: string;
  @Input({ required: true }) type: string;
  @Input() altValue: string;
  @Input() header: string;

  constructor() {
    this.content = '';
    this.type = 'roll';
    this.altValue = '';
    this.header = '';
  }
}
