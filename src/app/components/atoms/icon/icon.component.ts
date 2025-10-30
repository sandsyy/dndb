import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
    selector: 'app-icon',
    imports: [LucideAngularModule],
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss'
})
export class IconComponent {
  @Input({ required: true }) name: string;
  @Input() size: number;
  @Input() strokeWidth: number;
  @Input() color: string;

  constructor() {
    this.name = '';
    this.size = 24;
    this.strokeWidth = 1.5;
    this.color = 'primary-100';
  }
}
