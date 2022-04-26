import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';


@Component({
  selector: 'app-wip',
  templateUrl: './wip.component.html',
  styleUrls: ['./wip.component.scss']
})
export class WipComponent implements OnInit {
  /**
   * Config for storing all the values
   */
  config: any = {
    countries: 0,
    isLoading: true,
    error: 0,
    selectedCity: undefined,
    chartData: undefined,
    date: new Date(),
    chartOptions: {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    }
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
    this.config.date.setFullYear(this.config.date.getFullYear() - 1);
    this.getCountries();
  }

  /**
   * Fetch Country Lists
   */
  getCountries() {
    let url = 'https://api.covid19api.com/countries';
    this.rest.getAPIData(url).subscribe((res) => {
      if (res) {
        this.config.countries = res;
        this.config.isLoading = false;
      }
    }, err => {
      this.config.isLoading = false;
      this.config.error = err;
    })
  }

  /**
   * Convert API data into Chart Data
   * @param res Response of API
   */
  generateChartData(res: any) {
    let label: any = [], activeData: any = [], recovered: any = [], deaths: any = [];
    res.forEach((element: any) => {
      label.push(moment(new Date(element.Date)).format('DD/MM/YYYY'));
      activeData.push(element.Active);
      recovered.push(element.Recovered);
      deaths.push(element.Deaths);
    });
    this.config.chartData = {
      labels: label,
      datasets: [
        {
          label: 'Active Cases',
          data: activeData,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0
        },
        {
          label: 'Recovered',
          data: recovered,
          fill: false,
          borderColor: 'green',
          tension: 0
        },
        {
          label: 'Deaths',
          data: deaths,
          fill: false,
          borderColor: 'red',
          tension: 0
        }
      ]
    };
  }

  /**
   * Fetch Country Wise Data
   */
  fetchCountryData() {
    let url = "https://api.covid19api.com/live/country/" + this.config.selectedCity.Slug + "/status/confirmed/date/" + this.config.date.toJSON();
    this.rest.getAPIData(url).subscribe((res: any) => {
      if (res.length) {
        this.generateChartData(res);
        this.config.error = 0
        this.config.isLoading = false;
      } else {
        this.config.error = 'No Data Found';
        this.config.isLoading = false;
      }
    }, err => {
      this.config.error = err;
      this.config.isLoading = false;
    })
  }

  /**
   * On Country change call API
   */
  countryChanged() {
    this.config.isLoading = true;
    this.fetchCountryData();
  }

}
