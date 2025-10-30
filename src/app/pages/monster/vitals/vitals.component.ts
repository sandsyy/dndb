import { Component } from '@angular/core';
import { RollComponent } from "../../../components/atoms/roll/roll.component";
import { ChipComponent } from "../../../components/atoms/chip/chip.component";

@Component({
  selector: 'app-vitals',
  standalone: true,
  imports: [RollComponent, ChipComponent],
  templateUrl: './vitals.component.html',
  styleUrl: './vitals.component.scss'
})
export class VitalsComponent {

}
