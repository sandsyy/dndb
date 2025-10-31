import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MonsterCardComponent } from './components/molecules/monster-card/monster-card.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, MonsterCardComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dndb';
}
