import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbAuthService } from '../services/fb-auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogedin$ : Observable<boolean>;
  isLogedout$ : Observable<boolean>; 
  userMail$ : Observable<string>; 

  constructor(private router : Router, private Auth : FbAuthService) {
    this.isLogedin$ =  this.Auth.isLogedin;
    this.isLogedout$ = this.isLogedin$.pipe(map(resoult => !resoult));
    this.userMail$ = this.Auth.user.pipe(map(user => user ? user.email : null ));
   }

  ngOnInit() {
  }

  Login() {
    this.router.navigateByUrl('login');
  }

  Storeges() {
    this.router.navigateByUrl('main');
  }
}
