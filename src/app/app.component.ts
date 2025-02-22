import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { HttpClientModule } from '@angular/common/http';
import { GetUnitsService } from './services/get-units.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormsComponent, HttpClientModule],
  templateUrl: './app.component.html',
  providers: [GetUnitsService], 
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'desafio-smartfit';
}