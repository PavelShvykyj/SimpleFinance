import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { IStorege } from '../models/istorege';
import { FbbaseService } from '../services/fb-base.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StoregeResolver implements Resolve<Observable<IStorege>> {
  constructor(private db : FbbaseService) {

  }

  resolve(rout : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<IStorege> {
    
    if(!rout.params.storegeID) {
        return of(<IStorege>{id : '', name : ""});
    }
    
    let resoult = this.db.GetStorege(`storeges/${rout.params.storegeID}`)
    .pipe(
      catchError(err =>of(<IStorege>{id : '', name : ""}))
      );
 
    return resoult 
  }
} 
