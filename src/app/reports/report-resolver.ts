
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { FbbaseService } from '../services/fb-base.service';
import { catchError, map, finalize, first } from 'rxjs/operators';
import { IStoreges } from '../models/istoreges';

@Injectable()
export class ReportResolver implements Resolve<Observable<IStoreges>> {
  constructor(private db : FbbaseService) {

  }

  resolve(rout : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<IStoreges> {
    
    let resoult = this.db.GetStoreges()
    .pipe(
        map(storeges  => {
            let Storeges : IStoreges = <IStoreges>{Names : [], Storeges : {} };
            
            storeges.forEach(element => {
                Storeges.Names.push(element.name);
                Storeges[element.name]=element.id;
            });
            console.log(Storeges);
            return Storeges;
        }),
        first()
      );
 
    return resoult; 
  }
} 
