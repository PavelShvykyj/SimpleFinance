import { CalendarComponent } from './calendar/calendar.component';

import { MainComponent } from './main/main.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoregeFormComponent } from './storege-form/storege-form.component';
import { StoregeResolver } from './storege-form/storege-form.resolver';
import { ActionComponent } from './action/action.component';
import { ActionListComponent } from './action-list/action-list.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'main', component: MainComponent },
  { path: 'storege/:storegeID', component:  StoregeFormComponent, resolve : {storege : StoregeResolver}},
  { path: 'calendar/:storegeID/:storegeName', component:  CalendarComponent },
  { path: 'action/:dateID/:storegeID/:storegeName' , component : ActionComponent },
  { path: 'actionlist/:storegeID/:storegeName' , component : ActionListComponent },
  { path: 'reports' , component : ReportsComponent },
  
  { path: '**', component:  HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
