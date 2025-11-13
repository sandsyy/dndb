/**
 * API-related types for D&D 5e API interactions
 * These types represent the structure of API requests and responses
 */

import type { ApiReference } from '../shared';

export interface PaginatedApiList<TItem> {
  count: number;
  results: TItem[];
}

export interface MonsterListParams {
  // Per docs, a wide range of filters are supported; we expose common ones and allow passthrough
  name?: string;
  type?: string;
  size?: string;
  alignment?: string;
  challenge_rating?: string | number; // API accepts ranges like "1,2,3" as well
  limit?: string | number;
  skip?: string | number;
  [key: string]: string | number | undefined; // allow additional filters supported by the API
}

// Re-export ApiReference for convenience
export type { ApiReference } from '../shared';
