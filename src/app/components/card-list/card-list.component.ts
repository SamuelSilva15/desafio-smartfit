import { Component, Input } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-list',
  imports: [CardComponent, CommonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
    @Input() unitsList: Location[] = [];

    constructor() {}
}
