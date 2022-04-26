import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})



export class SummaryComponent implements OnInit {
  /**
   * Config for storing all the values
   */
  config: any = {
    summaryData: 0,
    isLoading: true,
    error: 0,
  }

  /**
   * Constructor Function
   * @param rest Rest Service Instance
   */
  constructor(private rest: RestService) { }

  /**
   * ngOnit Function
   */
  ngOnInit(): void {
    this.getSummaryData();
  }

  /**
   * Fetch Summary Data
   */
  getSummaryData() {
    let url = 'https://api.covid19api.com/summary';
    this.rest.getAPIData(url).subscribe((res) => {
      if (res) {
        this.config.summaryData = res;
        this.config.isLoading = false;
      }
    }, err => {
      this.config.isLoading = false;
      this.config.error = err;
    })
  }

}
