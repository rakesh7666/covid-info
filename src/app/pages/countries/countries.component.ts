import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import * as moment from 'moment';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  /**
   * Config for storing all the values
   */
  config: any = {
    countries: 0,
    isLoading: true,
    error: 0,
    selectedCity: undefined,
    selectedOption: 'confirmed',
    options: [
      {
        label: 'Confirmed',
        value: 'confirmed'
      },
      {
        label: 'Recovered',
        value: 'recovered'
      },
      {
        label: 'Deaths',
        value: 'deaths'
      }
    ],
    chartData: undefined,
    chartOptions: {
      plugins: {
        legend: false
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
    let label: any = [], data: any = [];
    res.forEach((element: any) => {
      label.push(moment(new Date(element.Date)).format('DD/MM/YYYY'));
      data.push(element.Cases);
    });
    this.config.chartData = {
      labels: label,
      datasets: [
        {
          label: this.config.selectedOption,
          data: data,
          fill: false,
          borderColor: '#42A5F5',
          tension: 0
        }
      ]
    };
  }

  /**
   * On Options change call API
   */
  optionChanged() {
    this.fetchCountryData(this.config.selectedCity.Country);
  }

  /**
   * Fetch Country Wise Data
   */
  fetchCountryData(country: string) {
    let url = "https://api.covid19api.com/country/" + country + "/status/" + this.config.selectedOption;
    this.rest.getAPIData(url).subscribe((res: any) => {
      if (res.length) {
        this.generateChartData(res);
        this.config.isLoading = false;
        this.config.error = 0
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
  countryChanged($event: any) {
    this.config.isLoading = true;
    let country = $event.value.Country;
    this.fetchCountryData(country);
  }

}
