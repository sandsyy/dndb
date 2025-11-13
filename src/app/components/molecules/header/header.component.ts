import { Component } from '@angular/core';
import { ButtonComponent } from '../../atoms/button/button.component';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  isMenuOpen = false;
  isClosing = false;

  toggleMenu(): void {
    if (this.isMenuOpen) {
      this.isClosing = true;
      setTimeout(() => {
        this.isMenuOpen = false;
        this.isClosing = false;
      }, 300); // Match animation duration
    } else {
      this.isMenuOpen = true;
      this.isClosing = false;
    }
  }

  startClosing(): void {
    this.isClosing = true;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.isClosing = false;
  }
}
