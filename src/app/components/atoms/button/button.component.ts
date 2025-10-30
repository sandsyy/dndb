// import { Component, Input } from '@angular/core';
// import { IconComponent } from '../icon/icon.component';

import figma, { html } from '@figma/code-connect/html';

figma.connect('https://...', {
  props: {
    text: figma.string('Text'),
    disabled: figma.boolean('Disabled'),
    size: figma.enum('Size', {
      'small': 'sm',
      'large': 'lg'
    })
  },
  example: (props) =>
    html`\
<button class="button">
    <app-icon *ngIf="leftIcon" [name]="leftIcon"></app-icon>
    <span class="button-text">
        <ng-content></ng-content>
    </span>
    <app-icon *ngIf="rightIcon" [name]="rightIcon"></app-icon>
</button>

<script>
  @Component({
  selector: 'app-button',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() leftIcon: string;
  @Input() rightIcon: string;

  constructor() {
    this.leftIcon = '';
    this.rightIcon = '';
  }
}
</script>`,
  imports: ["import { DsButton } from '@ds-angular/button'"],
}
)