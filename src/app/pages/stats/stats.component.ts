import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  config: any = {
    stats: [],
    isLoading: true,
    error: 0,
  }
  constructor(private rest: RestService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    let url = 'https://api.covid19api.com/stats';
    this.rest.getAPIData(url).subscribe((res: any) => {
      if (res) {
        Object.keys(res).forEach(d => {
          console.log();
          let data = {
            name: d,
            value: d.indexOf('Updated') > -1 && res[d] != '' ? moment(new Date(res[d])).format('DD/MM/YYYY') : res[d]
          };
          this.config.stats.push(data);
        });
        this.config.isLoading = false;
      }
    }, err => {
      this.config.isLoading = false;
      this.config.error = err;
    })
  }

}
