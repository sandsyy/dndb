import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TabGroupComponent } from '../../components/molecules/tab-group/tab-group.component';
import { RollComponent } from '../../components/atoms/roll/roll.component';
import { SpinnerComponent } from '../../components/atoms/spinner/spinner.component';
import { Dnd5eService } from '../../services/dnd-5e.service';
import type { Monster } from '../../types';

@Component({
    selector: 'app-monster',
    standalone: true,
    imports: [RouterOutlet, TabGroupComponent, RollComponent, SpinnerComponent],
    templateUrl: './monster.component.html',
    styleUrl: './monster.component.scss'
})
export class MonsterComponent {
  id: string;
  monster: Monster;
  router: Router;
  dnd5eService: Dnd5eService;
  isLoading = false;

  constructor(@Inject(ActivatedRoute) route: ActivatedRoute, @Inject(Router) router: Router, dnd5eService: Dnd5eService) {
    this.router = router;
    this.dnd5eService = dnd5eService;
    this.id = 'owlbear';
    this.monster = {} as Monster;
    
    // Subscribe to route params and fetch monster data when ID changes
    route.params.subscribe((params) => {
      const newId = params['id'];
      // Only fetch if the ID has actually changed
      if (newId && newId !== this.id) {
        this.id = newId;
        this.getMonster(this.id);
      } else if (newId) {
        this.id = newId;
      }
    });
  }

  ngOnInit() {
    // Fetch initial monster data if not already loaded
    if (!this.monster.index) {
      this.getMonster(this.id);
    }
  }

  getMonster(id: string) {
    this.isLoading = true;
    this.dnd5eService.getMonsterByIndex(id).subscribe({
      next: (monster) => {
        this.monster = monster;
        this.isLoading = false;
        console.log(this.monster);
      },
      error: (error) => {
        console.error('Error fetching monster:', error);
        this.isLoading = false;
      }
    });
  }

  onTabSelect(tab: string) {
    this.router.navigate([`/monster/${this.id}/${tab}`]);
  }
}
