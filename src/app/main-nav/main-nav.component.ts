import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbAuthService } from '../services/fb-auth.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  isLogedin$ : Observable<boolean>;
  isLogedout$ : Observable<boolean>; 
  pictureUrl$ : Observable<string>; 


  constructor(private breakpointObserver: BreakpointObserver, private Auth : FbAuthService, private router : Router) {
    this.isLogedin$ =  this.Auth.isLogedin;
    this.isLogedout$ = this.isLogedin$.pipe(map(resoult => !resoult));
    this.pictureUrl$ = this.Auth.user.pipe(map(user => user ? user.photoURL : null ))
  }

  LogOut() {
    this.Auth.LogOut();
    this.router.navigateByUrl('home');

  }

  ngOnDestroy() {
    this.LogOut();
  }

}
