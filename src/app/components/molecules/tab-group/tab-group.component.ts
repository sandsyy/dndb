import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TabComponent } from '../../atoms/tab/tab.component';

export interface TabItem {
  label: string;
  path: string; // child route segment, e.g., 'vitals'
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule, RouterModule, TabComponent],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss'
})
export class TabGroupComponent {
  @Input() items: TabItem[] = [];

  constructor(@Inject(Router) private router: Router, @Inject(ActivatedRoute) private route: ActivatedRoute) {}

  isSelected(item: TabItem): boolean {
    const child = this.route.firstChild;
    const current = child?.routeConfig?.path ?? '';
    return current === item.path;
  }

  onSelect(item: TabItem): void {
    // Navigate to the child route relative to the current route
    this.router.navigate([item.path], { relativeTo: this.route });
  }
}


