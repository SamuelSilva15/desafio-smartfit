import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { HttpClientModule } from '@angular/common/http';
import { GetUnitsService } from './services/get-units.service';
import { CardListComponent } from "./components/card-list/card-list.component";
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Location } from './types/location.interface';
import { LegendComponent } from "./components/legend/legend.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FormsComponent, HttpClientModule, CardListComponent, CommonModule, LegendComponent],
  templateUrl: './app.component.html',
  providers: [GetUnitsService], 
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showList = new BehaviorSubject(false)
  unitsList: Location[] = [];

  constructor(private unitService: GetUnitsService) {

  }

  onSubmit() {
    this.showList.next(true);
    this.unitsList = this.unitService.getFilteredUnits();
  }
}