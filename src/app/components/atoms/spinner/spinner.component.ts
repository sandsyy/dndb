import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-spinner',
    imports: [],
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
}
