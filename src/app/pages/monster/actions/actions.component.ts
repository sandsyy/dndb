import { Component, Inject } from '@angular/core';
import { Monster } from '../../../services/dnd-5e.service';
import { ChipComponent } from '../../../components/atoms/chip/chip.component';
import { MonsterComponent } from '../monster.component';

@Component({
    selector: 'app-actions',
    standalone: true,
    imports: [ChipComponent],
    templateUrl: './actions.component.html',
    styleUrl: './actions.component.scss'
})
export class ActionsComponent {
  monster: Monster;

  constructor(@Inject(MonsterComponent) private parent: MonsterComponent) {
    this.monster = this.parent.monster;
  }

  // Format attack bonus with + sign
  formatAttackBonus(bonus: number | undefined): string {
    if (!bonus) return '+0';
    return bonus >= 0 ? `+${bonus}` : `${bonus}`;
  }

  // Format damage dice string (add spaces around + for readability)
  formatDamageDice(dice: string): string {
    return dice.replace(/([+-])/g, ' $1 ');
  }

  // Extract reach from description (e.g., "reach 5 ft.")
  extractReach(desc: string): string {
    const match = desc.match(/reach (\d+\s*ft\.?)/i);
    return match ? match[1] : '';
  }

  // Check if action has attack data (not a multiattack-only action)
  hasAttackData(action: any): boolean {
    return action.attack_bonus !== undefined || (action.damage && action.damage.length > 0);
  }

  // Get actions for left column (first half, rounded up)
  getLeftColumnActions(): any[] {
    if (!this.monster.actions) return [];
    const midpoint = Math.ceil(this.monster.actions.length / 2);
    return this.monster.actions.slice(0, midpoint);
  }

  // Get actions for right column (second half)
  getRightColumnActions(): any[] {
    if (!this.monster.actions) return [];
    const midpoint = Math.ceil(this.monster.actions.length / 2);
    return this.monster.actions.slice(midpoint);
  }
}
