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

  @Input({ required: true }) content: string;
  @Input() type: string;

  constructor() {
    this.content = 'roll';
    this.type = '';
  }
}
