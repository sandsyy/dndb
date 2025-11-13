import { Component, Inject } from '@angular/core';
import type { Monster } from '../../../types';
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
  formatDamageDice(dice: string | undefined): string {
    if (!dice) return '';
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

  // Check if action has multiple damage options (nested in from.options)
  // This is different from multiple damage types in one attack (like Bite or Longbow)
  hasMultipleOptions(action: any): boolean {
    if (!action.damage || action.damage.length === 0) return false;
    
    // Only return true if there's a nested options structure with multiple choices
    // (e.g., Longsword with "One-handed" vs "Two-handed" options)
    return action.damage[0]?.from?.options && action.damage[0].from.options.length > 1;
  }

  // Get damage options for actions with multiple choices
  getDamageOptions(action: any): any[] {
    if (!action.damage || action.damage.length === 0) {
      return [];
    }
    
    // Check for nested options structure (e.g., Longsword with choices in from.options)
    if (action.damage[0]?.from?.options && action.damage[0].from.options.length > 1) {
      return action.damage[0].from.options;
    }
    
    // Fallback to single option or multiple direct entries
    if (action.damage.length === 1 && !action.damage[0].from?.options) {
      return [action.damage[0]];
    }
    
    // Multiple direct entries (like Bite with multiple damage types)
    return action.damage;
  }

  // Extract option name from the damage option (checks notes field directly)
  getOptionName(action: any, optionIndex: number): string {
    if (!this.hasMultipleOptions(action)) {
      return '';
    }

    const options = this.getDamageOptions(action);
    if (options && options[optionIndex] && options[optionIndex].notes) {
      return options[optionIndex].notes;
    }

    return '';
  }
}
