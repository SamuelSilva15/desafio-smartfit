import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { Location } from "../../types/location.interface";

const OPENNING_HOURS = {
  morning: {
    first: '06',
    last: '12' 
  },
  afternoon: {
    first: '12',
    last: '18'
  },
  night: {
    first: '18',
    last: '23'
  }
}

type HOUR_INDEXES = 'morning' | 'afternoon' | 'night';

@Component({
  selector: 'app-forms',
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent implements OnInit {
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuild : FormBuilder, private unitService : GetUnitsService) {}

  transformWeekday(weekday: number) {
    switch(weekday) {
      case 0:
        return 'Dom.';
      case 6:
        return 'Sáb.';
      default:
        return 'Seg. à Sex;'
    }
  }

  filterUnits(unit: Location, open_hourse: string, close_hour: string): boolean {
    let open_hour_filter = parseInt(open_hourse, 10);
    let close_hour_filter = parseInt(close_hour, 10);
  
    let todays_weekday = this.transformWeekday(new Date().getDay());
  
    for (let i = 0; i < unit.schedules.length; i++) {
      let schedule_hour = unit.schedules[i].hour;
      let schedule_weekday = unit.schedules[i].weekdays;
  
      if (todays_weekday === schedule_weekday) {
        if (schedule_hour !== 'Fechada' && schedule_hour.includes(' às ')) {
          let [unit_open_hour, unit_close_hour] = schedule_hour.split(' às ');
  
          let unit_open_hour_int = parseInt(unit_open_hour.replace('h', ''), 10);
          let unit_close_hour_int = parseInt(unit_close_hour.replace('h', ''), 10);
  
          if (unit_open_hour_int >= open_hour_filter && unit_close_hour_int >= close_hour_filter) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
  

  onSubmit(): void {
    let intermediateResults = this.results;
    
    console.log('showClosed: ' + this.formGroup.value.showClosed);

    console.log('inicio: ' + this.filteredResults);

    if(!this.formGroup.value.showClosed) {
      intermediateResults = this.results.filter(location => location.opened === true);
    }
    
    console.log('hour: ' + this.formGroup.value.hour);
    if(this.formGroup.value.hour) {
      const OPEN_HOUR = OPENNING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].first;
      const CLOSE_HOUR = OPENNING_HOURS[this.formGroup.value.hour as HOUR_INDEXES].last;
      this.filteredResults = intermediateResults.filter(location => this.filterUnits(location, OPEN_HOUR, CLOSE_HOUR));
    } else {
      this.filteredResults = intermediateResults;
    }
  
    console.log('final: ' + this.filteredResults);
  }

  onClean (): void {
    this.formGroup.reset();
  }

  ngOnInit():void {
    this.formGroup = this.formBuild.group({
      hour: [''],
      showClosed: false,
    });
   this.unitService.getAllUnits().subscribe((data) => {
      this.results = data.locations;
      this.filteredResults = data.locations;
    });
}
}
