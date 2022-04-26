import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestService } from './services/rest.service';
import { SummaryComponent } from './pages/summary/summary.component';
import { MenubarModule } from 'primeng/menubar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatsComponent } from './pages/stats/stats.component';
import { WipComponent } from './pages/wip/wip.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChartModule } from 'primeng/chart';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    SummaryComponent,
    StatsComponent,
    WipComponent,
    CountriesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MenubarModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    TableModule,
    DropdownModule,
    FormsModule,
    RadioButtonModule,
    ChartModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [RestService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
