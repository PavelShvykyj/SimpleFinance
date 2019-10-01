import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui : firebaseui.auth.AuthUI;

  constructor(private fbAuth : AngularFireAuth,
              private router : Router,
              private ngZone : NgZone) { }

  ngOnInit() {
    const  uiConfig = {
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks : {
        signInSuccessWithAuthResult : this.OnLoginSucsess.bind(this),
        signInFailure : this.OnLoginFail.bind(this)
      }
    }

    // this.fbAuth.auth
    // fbAuth : AngularFireAuth - объект оболочки из ангулара
    //  fbAuth.auth - свойство содержит объет firebase SDK
    // поэтому в функцию передаем именно свойство "auth"
    this.ui = new firebaseui.auth.AuthUI(this.fbAuth.auth);
    this.ui.start("#fb-ui-container",uiConfig);


  }

  ngOnDestroy() {
    this.ui.delete();
  }

  OnLoginSucsess() {
   
    /// без ngZone ангулар не понимает что прошли изменения и не обновляет интерфейс
    this.ngZone.run(() => this.router.navigateByUrl("/home"));
  }

  OnLoginFail(error) {
    console.log('OnLoginFail',error)

  }
}
