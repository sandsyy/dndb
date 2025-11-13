/**
 * Centralized type exports for the application
 * 
 * Usage:
 * - Import from specific categories: import type { Monster } from '../types/entities'
 * - Import from main barrel: import type { Monster, ApiReference } from '../types'
 */

// Shared types (fundamental building blocks)
export * from './shared';

// Entity types (domain models)
export * from './entities';

// Common types (used across entities)
export * from './common';

// API types (request/response structures)
export * from './api';
