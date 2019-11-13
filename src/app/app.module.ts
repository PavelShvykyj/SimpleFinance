
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';


/////////////  MATERIAL  ///////////////// 
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

/////////////////// Own Created ///////////////////////////////
import { FbAuthService } from './services/fb-auth.service';
import { FbbaseService } from './services/fb-base.service'


import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { StoregesComponent } from './storeges/storeges.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { StoregeFormComponent } from './storege-form/storege-form.component';
import { StoregeResolver } from './storege-form/storege-form.resolver';
import { CalendarComponent } from './calendar/calendar.component';
import { ActionComponent } from './action/action.component';
import { ActionListComponent } from './action-list/action-list.component';
import { UpdateActionDialogComponent } from './update-action-dialog/update-action-dialog.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportResolver } from './reports/report-resolver';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    HomeComponent,
    MainComponent,
    StoregesComponent,
    StoregeFormComponent,
    CalendarComponent,
    ActionComponent,
    ActionListComponent,
    UpdateActionDialogComponent,
    ReportsComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    /////////////  MATERIAL  ///////////////// 
    MatToolbarModule,
    LayoutModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatChipsModule,
    MatGridListModule,
    MatBadgeModule,
    MatStepperModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule


  ],
  entryComponents: [
    UpdateActionDialogComponent
  ],
  providers: [StoregeResolver,
              ReportResolver,
              FbAuthService, 
              FbbaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
