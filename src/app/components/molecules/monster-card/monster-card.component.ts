import { Component, Input } from '@angular/core';
import { ChipComponent } from '../../atoms/chip/chip.component';
import { Monster } from '../../../services/dnd-5e.service';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [ChipComponent, IconComponent],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.scss',
})
export class MonsterCardComponent {

  @Input() monster: string;

  constructor() {
    this.monster = '';
  }
}
