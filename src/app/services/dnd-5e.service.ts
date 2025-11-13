import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import type { ApiReference, PaginatedApiList, MonsterListParams, Monster } from '../types';

@Injectable({ providedIn: 'root' })
export class Dnd5eService {
  // 5e SRD API base; see docs
  // Docs: https://5e-bits.github.io/docs/api
  private readonly apiBaseUrl = 'https://www.dnd5eapi.co/api';
  
  // Cache for monster data to avoid repeated API calls
  private monsterCache = new Map<string, Observable<Monster>>();

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
   * Uses caching to avoid repeated API calls for the same monster.
   */
  getMonsterByIndex(index: string): Observable<Monster> {
    // Check if the monster is already in cache
    if (!this.monsterCache.has(index)) {
      // If not cached, make the API call and cache it with shareReplay
      const monster$ = this.http.get<Monster>(`${this.apiBaseUrl}/monsters/${encodeURIComponent(index)}`).pipe(
        shareReplay(1) // Cache the last emitted value and replay it to new subscribers
      );
      this.monsterCache.set(index, monster$);
    }
    
    return this.monsterCache.get(index)!;
  }
  
  /**
   * Clear the monster cache. Useful if you need to force refresh data.
   */
  clearMonsterCache(index?: string): void {
    if (index) {
      this.monsterCache.delete(index);
    } else {
      this.monsterCache.clear();
    }
  }
}


