import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../../atoms/button/button.component';

@Component({
  selector: 'app-menu',
  imports: [ButtonComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() isClosing = false;
  @Output() close = new EventEmitter<void>();
  @Output() closingStart = new EventEmitter<void>();

  constructor(private router: Router) {}

  onClose(): void {
    if (!this.isClosing) {
      this.closingStart.emit();
      setTimeout(() => {
        this.close.emit();
      }, 300); // Match animation duration
    }
  }

  onMenuItemClick(route: string): void {
    if (!this.isClosing) {
      // Route immediately
      this.router.navigate([route]);
      // Start closing animation
      this.closingStart.emit();
      // Close menu after animation completes
      setTimeout(() => {
        this.close.emit();
      }, 300); // Match animation duration
    }
  }
}
