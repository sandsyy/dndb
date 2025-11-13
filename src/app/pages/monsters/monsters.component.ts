import { Component, OnInit, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dnd5eService } from '../../services/dnd-5e.service';
import type { ApiReference, Monster } from '../../types';
import { MonsterCardComponent } from '../../components/molecules/monster-card/monster-card.component';
import { SpinnerComponent } from '../../components/atoms/spinner/spinner.component';
import { InputComponent } from '../../components/atoms/input/input.component';
import { Subject, of } from 'rxjs';
import { map, catchError, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

interface MonsterWithDetails extends ApiReference {
  details?: Monster;
}

@Component({
  selector: 'app-monsters',
  standalone: true,
  imports: [CommonModule, FormsModule, MonsterCardComponent, SpinnerComponent, InputComponent],
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.scss',
})
export class MonstersComponent implements OnInit, AfterViewInit, OnDestroy {
  allMonsters: MonsterWithDetails[] = [];
  filteredMonsters: MonsterWithDetails[] = [];
  displayedMonsters: MonsterWithDetails[] = []; // Only monsters to display
  searchTerm: string = '';
  loading: boolean = true;
  loadingMore: boolean = false;
  allMonstersLoaded: boolean = false;
  isSearching: boolean = false;
  
  private readonly LAZY_LOAD_SIZE = 20; // Load 20 monsters at a time
  private readonly REQUEST_DELAY = 150; // 150ms delay between individual requests
  private readonly SEARCH_DEBOUNCE_TIME = 1000; // 1 second debounce for search
  private allMonsterRefs: ApiReference[] = [];
  private filteredMonsterRefs: ApiReference[] = [];
  private loadedCount: number = 0;
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private dnd5eService: Dnd5eService) {
    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(this.SEARCH_DEBOUNCE_TIME),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    // Reset lazy loading state
    this.loadedCount = 0;
    this.allMonstersLoaded = false;
    this.displayedMonsters = [];
    // Load monsters
    this.loadMonsters();
  }

  ngAfterViewInit(): void {
    // Reset scroll position after view is initialized
    // Use setTimeout to ensure it happens after Angular's scroll restoration
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (this.loadingMore || this.allMonstersLoaded || this.loading) {
      return;
    }

    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 200; // Start loading 200px before bottom

    if (scrollPosition >= documentHeight - threshold) {
      this.loadMoreMonsters();
    }
  }

  loadMonsters(): void {
    this.loading = true;
    this.dnd5eService.listMonsters().subscribe({
      next: (response) => {
        this.allMonsterRefs = response.results;
        // Initialize all monsters with basic info
        this.allMonsters = response.results.map(ref => ({ ...ref, details: undefined }));
        this.filteredMonsters = this.allMonsters;
        
        // Load first batch of 20 monsters
        this.loadNextBatch();
      },
      error: (error) => {
        console.error('Error loading monsters:', error);
        this.loading = false;
      }
    });
  }

  loadNextBatch(): void {
    const sourceRefs = this.searchTerm.trim() ? this.filteredMonsterRefs : this.allMonsterRefs;
    
    if (this.loadedCount >= sourceRefs.length) {
      this.allMonstersLoaded = true;
      this.loading = false;
      this.loadingMore = false;
      return;
    }

    this.loadingMore = true;
    const startIndex = this.loadedCount;
    const endIndex = Math.min(startIndex + this.LAZY_LOAD_SIZE, sourceRefs.length);
    const batchRefs = sourceRefs.slice(startIndex, endIndex);

    // Load details for this batch
    this.loadMonsterDetailsBatch(batchRefs, () => {
      this.loadedCount = endIndex;
      this.updateDisplayedMonsters();
      this.loadingMore = false;
      this.loading = false;
    });
  }

  loadMoreMonsters(): void {
    if (!this.loadingMore && !this.allMonstersLoaded) {
      this.loadNextBatch();
    }
  }

  private loadMonsterDetailsBatch(monsters: ApiReference[], onComplete: () => void): void {
    let completed = 0;
    const total = monsters.length;

    if (total === 0) {
      onComplete();
      return;
    }

    monsters.forEach((ref, index) => {
      setTimeout(() => {
        this.dnd5eService.getMonsterByIndex(ref.index).pipe(
          map(details => ({ ...ref, details })),
          catchError((error) => {
            const isRateLimited = error?.status === 429 || error?.error?.status === 429;
            if (isRateLimited) {
              console.warn(`Rate limited for ${ref.name}, skipping`);
            } else {
              console.warn(`Failed to load details for ${ref.name}:`, error);
            }
            return of({ ...ref, details: undefined });
          })
        ).subscribe({
          next: (monsterWithDetails) => {
            // Update the monster in allMonsters array if it exists there
            const allMonsterIndex = this.allMonsters.findIndex(m => m.index === monsterWithDetails.index);
            if (allMonsterIndex !== -1) {
              this.allMonsters[allMonsterIndex] = monsterWithDetails;
            }
            
            // Update the monster in filteredMonsters array if it exists there
            const filteredMonsterIndex = this.filteredMonsters.findIndex(m => m.index === monsterWithDetails.index);
            if (filteredMonsterIndex !== -1) {
              this.filteredMonsters[filteredMonsterIndex] = monsterWithDetails;
            }
            
            completed++;
            if (completed === total) {
              onComplete();
            }
          },
          error: (error) => {
            console.error(`Unexpected error for ${ref.name}:`, error);
            completed++;
            if (completed === total) {
              onComplete();
            }
          }
        });
      }, index * this.REQUEST_DELAY); // Stagger requests
    });
  }

  private updateDisplayedMonsters(): void {
    // Show all loaded monsters (up to loadedCount)
    if (this.searchTerm.trim()) {
      // If searching, show all filtered monsters that have been loaded
      this.displayedMonsters = this.filteredMonsters.slice(0, this.loadedCount);
    } else {
      // Otherwise show all loaded monsters
      this.displayedMonsters = this.allMonsters.slice(0, this.loadedCount);
    }
  }

  onSearchChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchTerm = inputValue;
    
    // Emit to debounced search subject - it will handle both search and reset
    this.searchSubject.next(inputValue);
  }

  private resetToAllMonsters(): void {
    this.filteredMonsters = [];
    this.filteredMonsterRefs = [];
    this.loadedCount = 0;
    this.allMonstersLoaded = false;
    this.isSearching = false;
    this.loadNextBatch();
  }

  private performSearch(searchTerm: string): void {
    const trimmedTerm = searchTerm.trim();
    
    if (!trimmedTerm) {
      this.resetToAllMonsters();
      return;
    }

    this.isSearching = true;
    this.loading = true;
    this.loadedCount = 0;
    this.allMonstersLoaded = false;
    this.filteredMonsters = [];
    
    // Call API to search all monsters
    this.dnd5eService.listMonsters({ name: trimmedTerm }).subscribe({
      next: (response) => {
        this.filteredMonsterRefs = response.results;
        // Initialize filtered monsters with basic info
        this.filteredMonsters = response.results.map(ref => ({ ...ref, details: undefined }));
        
        // Start loading details for the first batch
        this.loadNextBatch();
      },
      error: (error) => {
        console.error('Error searching monsters:', error);
        this.loading = false;
        this.isSearching = false;
        this.filteredMonsters = [];
        this.displayedMonsters = [];
      }
    });
  }
}
