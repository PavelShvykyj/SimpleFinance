import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui'
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FbbaseService } from '../services/fb-base.service';
import { FbAuthService } from '../services/fb-auth.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  ui : firebaseui.auth.AuthUI;

  constructor(private fbAuth : AngularFireAuth,
              private router : Router,
              private ngZone : NgZone,
              private db : FbbaseService,
              private auth : FbAuthService,
              private _snackBar: MatSnackBar) { }

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

  async OnLoginSucsess(resoult) {
      let NewUsersAllowed : boolean = await this.db.NewUsersAllowed();

    
      if(resoult.additionalUserInfo.isNewUser && !NewUsersAllowed) {
        
        this.auth.LogOut();
        let snack = this._snackBar.open("Вы успешно зарегистрировались. Работа новых пользователей веремнно приостановлена.", "Ok", 
        {
          duration: 5000
        });
        
        snack.afterDismissed().subscribe(() => {
          this.ngZone.run(() => this.router.navigateByUrl("home"));
        });
      }  
      else {
          this._snackBar.open("Готовим данные ...", "Ок",{duration: 2000});
          console.log(resoult.user.uid);
          this.db.RootPathExist(resoult.user.uid).subscribe(res => {
            if (res) {
              /// await this.db.DeterminRootPath(resoult.user.uid); вариант без ожидания
              /// без ngZone ангулар не понимает что прошли изменения и не обновляет интерфейс
              this.ngZone.run(() => this.router.navigateByUrl("main"));
            } 
          },
          err => {
            this.auth.LogOut();
            this._snackBar.open("Извините что то пошло не так", "Try again",{duration: 2000});
            this.ngZone.run(() => this.router.navigateByUrl("home"));    
           })
      }
  }

  OnLoginFail(error) {
    this.db.ClearRootPath();
    this.auth.LogOut();
    this._snackBar.open("Извините что то пошло не так", "Try again",{duration: 2000});
    this.ngZone.run(() => this.router.navigateByUrl("home"));    
  }
}
