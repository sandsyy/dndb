import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Minimal types matching the D&D 5e API for monsters
export interface ApiReference {
  index: string;
  name: string;
  url: string;
}

export interface PaginatedApiList<TItem> {
  count: number;
  results: TItem[];
}

// Highly simplified Monster type; expand as needed by the UI
export interface Monster {
  index: string;
  name: string;
  size?: string;
  type?: string;
  alignment?: string;
  challenge_rating?: number;
  proficiency_bonus?: number;
  hit_points?: number;
  armor_class: { value: number; type?: string }[];
  speed?: Record<string, string>;
  // Many more fields exist per docs; add as needed
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

@Injectable({ providedIn: 'root' })
export class Dnd5eService {
  // 5e SRD API base; see docs
  // Docs: https://5e-bits.github.io/docs/api
  private readonly apiBaseUrl = 'https://www.dnd5eapi.co/api';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get list of monsters with optional filtering.
   * Docs: https://5e-bits.github.io/docs/api/get-list-of-monsters-with-optional-filtering
   */
  listMonsters(params: MonsterListParams = {}): Observable<PaginatedApiList<ApiReference>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<PaginatedApiList<ApiReference>>(`${this.apiBaseUrl}/monsters`, {
      params: httpParams,
    });
  }

  /**
   * Get monster by index.
   * Docs: https://5e-bits.github.io/docs/api/get-monster-by-index
   */
  getMonsterByIndex(index: string): Observable<Monster> {
    return this.http.get<Monster>(`${this.apiBaseUrl}/monsters/${encodeURIComponent(index)}`);
  }
}


