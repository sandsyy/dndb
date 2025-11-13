/**
 * Common types used across multiple entities
 */

export interface Immunity {
  index: string;
  name: string;
  url: string;
}

export interface Skill {
  name: string;
  modifier: number;
  proficiency: number;
}

export interface Action {
  name: string;
  desc: string;
  attack_bonus?: number;
  damage?: Array<{
    damage_dice: string;
    damage_type: {
      index: string;
      name: string;
      url: string;
    };
  }>;
  multiattack_type?: string;
  actions?: Array<ActionChoice>;
}

export interface ActionChoice {
  action_name: string;
  count: string;
  type: string;
}

export interface SpecialAbility {
  name: string;
  desc: string;
}

