import { Component, Input } from '@angular/core';
import { ChipComponent } from '../../atoms/chip/chip.component';
import type { Monster } from '../../../types';
import { ButtonComponent } from '../../atoms/button/button.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monster-card',
  standalone: true,
  imports: [ChipComponent, IconComponent],
  templateUrl: './monster-card.component.html',
  styleUrl: './monster-card.component.scss',
})
export class MonsterCardComponent {

  @Input() monster: Monster | null = null;
  @Input() monsterIndex: string = '';

  constructor(private router: Router) {}

  get monsterName(): string {
    return this.monster?.name || '';
  }

  get monsterSubtext(): string {
    if (!this.monster) return '';
    const parts: string[] = [];
    if (this.monster.size) parts.push(this.monster.size);
    if (this.monster.type) parts.push(this.monster.type);
    if (this.monster.alignment) parts.push(this.monster.alignment);
    return parts.join('  ');
  }

  get challengeRating(): string {
    if (this.monster?.challenge_rating !== undefined) {
      return String(this.monster.challenge_rating);
    }
    return '0';
  }

  get armorClass(): string {
    if (this.monster?.armor_class && this.monster.armor_class.length > 0) {
      return String(this.monster.armor_class[0].value);
    }
    return '0';
  }

  navigateToMonster(): void {
    if (this.monsterIndex) {
      this.router.navigate(['/monster', this.monsterIndex]);
    }
  }
}
