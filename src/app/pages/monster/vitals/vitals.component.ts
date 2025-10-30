import { Component, Inject } from '@angular/core';
import { Monster } from '../../../services/dnd-5e.service';
import { ChipComponent } from '../../../components/atoms/chip/chip.component';
import { RollComponent } from '../../../components/atoms/roll/roll.component';
import { MonsterComponent } from '../monster.component';

@Component({
    selector: 'app-vitals',
    standalone: true,
    imports: [ChipComponent, RollComponent],
    templateUrl: './vitals.component.html',
    styleUrl: './vitals.component.scss'
})
export class VitalsComponent {
  monster: Monster;

  constructor(@Inject(MonsterComponent) private parent: MonsterComponent) {
    this.monster = this.parent.monster;
  }

  // Helper method to extract skill name from proficiency name
  getSkillName(proficiencyName: string): string {
    return proficiencyName.replace('Skill: ', '');
  }

  // Helper method to get sense entries
  getSenseEntries(): Array<{ name: string; value: string }> {
    if (!this.monster.senses) return [];
    const entries: Array<{ name: string; value: string }> = [];
    
    if (this.monster.senses.darkvision) {
      entries.push({ name: 'Darkvision', value: this.monster.senses.darkvision });
    }
    if (this.monster.senses.blindsight) {
      entries.push({ name: 'Blindsight', value: this.monster.senses.blindsight });
    }
    if (this.monster.senses.tremorsense) {
      entries.push({ name: 'Tremorsense', value: this.monster.senses.tremorsense });
    }
    if (this.monster.senses.truesight) {
      entries.push({ name: 'Truesight', value: this.monster.senses.truesight });
    }
    
    return entries;
  }
}
