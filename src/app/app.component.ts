import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  menuItems: any;

  constructor() {
    this.menuItems = [
      {
        link: '',
        name: 'Summary'
      },
      {
        link: 'countries',
        name: 'Countries'
      },
      {
        link: 'wip',
        name: 'World Total WIP'
      },
      {
        link: 'stats',
        name: 'Get Stats'
      }
    ]
  }
}
