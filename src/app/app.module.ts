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
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';

/////////////  MATERIAL  ///////////////// 
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { FbAuthService } from './services/fb-auth.service';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainNavComponent,
    HomeComponent,
    MainComponent
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
    MatListModule

  ],
  providers: [FbAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
