import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {

  @Input() placeholder: string;
  @Input() value: string;

  constructor() {
    this.placeholder = '';
    this.value = '';
  }

  onInputChange(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
  }
}