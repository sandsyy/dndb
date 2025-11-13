/**
 * Character-specific types
 */

import type { BaseEntity } from './base';
import type { Skill } from '../common';

export interface HitPoints {
  max: number;
  current: number;
  temporary: number;
}

export interface ProficienciesAndTraining {
  armor: string;
  weapons: string;
  tools: string;
  languages: string;
}

export interface Character extends BaseEntity {
  species: string;
  hit_points: HitPoints;
  skills: Array<Skill>;
  proficiencies_and_training: ProficienciesAndTraining;
}

