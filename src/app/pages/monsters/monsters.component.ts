import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dnd5eService, ApiReference, Monster } from '../../services/dnd-5e.service';
import { MonsterCardComponent } from '../../components/molecules/monster-card/monster-card.component';
import { ButtonComponent } from '../../components/atoms/button/button.component';
import { IconComponent } from '../../components/atoms/icon/icon.component';
import { SpinnerComponent } from '../../components/atoms/spinner/spinner.component';
import { forkJoin, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface MonsterWithDetails extends ApiReference {
  details?: Monster;
}

@Component({
  selector: 'app-monsters',
  standalone: true,
  imports: [CommonModule, FormsModule, MonsterCardComponent, ButtonComponent, IconComponent, SpinnerComponent],
  templateUrl: './monsters.component.html',
  styleUrl: './monsters.component.scss',
})
export class MonstersComponent implements OnInit, AfterViewInit {
  allMonsters: MonsterWithDetails[] = [];
  filteredMonsters: MonsterWithDetails[] = [];
  displayedMonsters: MonsterWithDetails[] = []; // Only monsters to display
  searchTerm: string = '';
  loading: boolean = true;
  loadingMore: boolean = false;
  allMonstersLoaded: boolean = false;
  
  private readonly LAZY_LOAD_SIZE = 20; // Load 20 monsters at a time
  private readonly REQUEST_DELAY = 150; // 150ms delay between individual requests
  private allMonsterRefs: ApiReference[] = [];
  private loadedCount: number = 0;

  constructor(private dnd5eService: Dnd5eService) {}

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
    if (this.loadedCount >= this.allMonsterRefs.length) {
      this.allMonstersLoaded = true;
      this.loading = false;
      this.loadingMore = false;
      return;
    }

    this.loadingMore = true;
    const startIndex = this.loadedCount;
    const endIndex = Math.min(startIndex + this.LAZY_LOAD_SIZE, this.allMonsterRefs.length);
    const batchRefs = this.allMonsterRefs.slice(startIndex, endIndex);

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
            // Update the monster in allMonsters array
            const monsterIndex = this.allMonsters.findIndex(m => m.index === monsterWithDetails.index);
            if (monsterIndex !== -1) {
              this.allMonsters[monsterIndex] = monsterWithDetails;
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


  onSearchChange(): void {
    if (!this.searchTerm.trim()) {
      this.filteredMonsters = this.allMonsters;
      this.updateDisplayedMonsters();
      return;
    }

    const searchLower = this.searchTerm.toLowerCase().trim();
    this.filteredMonsters = this.allMonsters.filter(monster =>
      monster.name.toLowerCase().includes(searchLower) ||
      monster.details?.type?.toLowerCase().includes(searchLower) ||
      monster.details?.size?.toLowerCase().includes(searchLower)
    );
    // When searching, show all filtered results (no lazy loading limit)
    this.displayedMonsters = this.filteredMonsters;
  }
}
