/**
 * Monster-specific types
 */

import type { BaseEntity } from './base';

export interface Proficiency {
  value: number;
  proficiency: {
    index: string;
    name: string;
    url: string;
  };
}

export interface Monster extends BaseEntity {
  type: string;
  alignment?: string;
  challenge_rating?: number;
  hit_points?: number;
  proficiencies?: Array<Proficiency>;
  // Individual ability scores (API returns these at top level for convenience)
  strength?: number;
  dexterity?: number;
  constitution?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
}

