import { Component, Inject } from '@angular/core';
import { Monster } from '../../../services/dnd-5e.service';
import { ChipComponent } from '../../../components/atoms/chip/chip.component';
import { MonsterComponent } from '../monster.component';

@Component({
  selector: 'app-abilities',
  standalone: true,
  imports: [ChipComponent],
  templateUrl: './abilities.component.html',
  styleUrl: './abilities.component.scss'
})
export class AbilitiesComponent {
  monster: Monster;

  constructor(@Inject(MonsterComponent) private parent: MonsterComponent) {
    this.monster = this.parent.monster;
  }

  // Calculate ability modifier using D&D 5e formula
  getModifier(score: number | undefined): string {
    if (!score) return '+0';
    const modifier = Math.floor((score - 10) / 2);
    return modifier >= 0 ? `+${modifier}` : `${modifier}`;
  }
}
