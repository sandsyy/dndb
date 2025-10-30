import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Dnd5eService, Monster } from '../../services/dnd-5e.service';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './monster.component.html',
  styleUrl: './monster.component.scss'
})
export class MonsterComponent {
  id: string;
  monster: Monster;
  dnd5eService: Dnd5eService;

  constructor(@Inject(ActivatedRoute) route: ActivatedRoute, dnd5eService: Dnd5eService) {
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
}
