import { Component, Inject, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TabComponent } from '../../atoms/tab/tab.component';

@Component({
    selector: 'app-tab-group',
    imports: [TabComponent],
    templateUrl: './tab-group.component.html',
    styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent {
  @Input() monsterId: string = '';

  selected: 'vitals' | 'abilities' | 'actions' = 'vitals';

  constructor(@Inject(Router) private router: Router, @Inject(ActivatedRoute) private route: ActivatedRoute) {
    // Watch the active child route to update selection
    this.route.url.subscribe(() => {
      const child = this.route.snapshot.firstChild;
      const segment = child?.url?.[0]?.path as 'vitals' | 'abilities' | 'actions' | undefined;
      if (segment === 'abilities' || segment === 'actions' || segment === 'vitals') {
        this.selected = segment;
      }
    });
  }

  onTabSelect(tab: 'vitals' | 'abilities' | 'actions') {
    if (!this.monsterId) return;
    this.selected = tab;
    this.router.navigate([`/monster/${this.monsterId}/${tab}`]);
  }
}
