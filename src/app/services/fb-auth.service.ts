import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FbbaseService } from './fb-base.service';

@Injectable({
  providedIn: 'root'
})
export class FbAuthService {

  private authState$ : Observable<firebase.User>  
  
  constructor(private afAuth : AngularFireAuth, private db : FbbaseService) { 
    this.authState$ = this.afAuth.authState;

  }

  get isLogedin() : Observable<boolean> {
    return this.authState$.pipe(map(user => !!user ));
  }  

  get user() : Observable<firebase.User> {
    return this.authState$;
  }

  LogOut() {
    this.afAuth.auth.signOut();
    this.db.ClearRootPath();
  }


}
