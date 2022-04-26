import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountriesComponent } from './pages/countries/countries.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SummaryComponent } from './pages/summary/summary.component';
import { WipComponent } from './pages/wip/wip.component';

const routes: Routes = [
  {
    path: '',
    component: SummaryComponent
  },
  {
    path: 'stats',
    component: StatsComponent
  },
  {
    path: 'countries',
    component: CountriesComponent
  }, {
    path: 'wip',
    component: WipComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
