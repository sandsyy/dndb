import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { TabGroupComponent } from '../../components/molecules/tab-group/tab-group.component';
import { RollComponent } from '../../components/atoms/roll/roll.component';
import { Dnd5eService, Monster } from '../../services/dnd-5e.service';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [RouterOutlet, TabGroupComponent, RollComponent],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss'
})
export class MonsterComponent {
  id: string;
  monster: Monster;
  router: Router;
  dnd5eService: Dnd5eService;

  constructor(@Inject(ActivatedRoute) route: ActivatedRoute, @Inject(Router) router: Router, dnd5eService: Dnd5eService) {
    this.router = router;
    this.dnd5eService = dnd5eService;
    this.id = 'owlbear';
    this.monster = {} as Monster;
    route.params.subscribe((params) => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.getMonster(this.id);
  }

  getMonster(id: string) {
    this.dnd5eService.getMonsterByIndex(id).subscribe((monster) => {
      this.monster = monster;
      console.log(this.monster);
    });
  }

  onTabSelect(tab: string) {
    this.router.navigate([`/monster/${this.id}/${tab}`]);
  }
}
