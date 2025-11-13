/**
 * Shared types used across multiple domains
 * These are fundamental building blocks for other types
 */

export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

export interface AbilityScores {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export interface Senses {
  darkvision?: string;
  blindsight?: string;
  tremorsense?: string;
  truesight?: string;
  passive_perception?: number;
}

export interface ArmorClass {
  value: number;
  type?: string;
}

export interface Speed {
  [key: string]: string;
}

