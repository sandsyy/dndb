/**
 * Base entity types - shared properties across all entities
 */

import type { AbilityScores, Senses, ArmorClass, Speed } from '../shared';
import type { Action, Immunity } from '../common';

export interface BaseEntity {
  index: string;
  name: string;
  size?: string;
  proficiency_bonus?: number;
  xp?: number;
  armor_class: ArmorClass[];
  speed?: Speed[];
  abilities: AbilityScores;
  senses?: Senses;
  damage_vulnerabilities?: string[];
  damage_resistances?: string[];
  damage_immunities?: string[];
  condition_immunities?: Array<Immunity>;
  special_abilities?: Array<{
    name: string;
    desc: string;
  }>;
  actions?: Array<Action>;
}

