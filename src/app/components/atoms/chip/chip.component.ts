import { Component, Input } from '@angular/core';
import { RollComponent } from '../roll/roll.component';

@Component({
    selector: 'app-chip',
    standalone: true,
    imports: [RollComponent],
    templateUrl: './chip.component.html',
    styleUrl: './chip.component.scss'
})
export class ChipComponent {

  @Input() content: string;
  @Input({ required: true }) chipType: string;
  @Input() rollType: string;
  @Input() altValue: string;
  @Input() header: string;
  @Input() notes: string;
  
  constructor() {
    this.content = '';
    this.chipType = 'roll';
    this.rollType = 'row';
    this.altValue = '';
    this.header = '';
    this.notes = '';
  }
}
