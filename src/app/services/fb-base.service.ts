import { iaction } from './../models/iaction';


import { IStorege } from './../models/istorege';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable, of, from, throwError } from 'rxjs';
import { icounter, icounterelement } from '../models/icounter';




@Injectable({
  providedIn: 'root'
})
export class FbbaseService {

  private rootPath : string;
  private newUsersAllowed : boolean;

  constructor(private db : AngularFirestore) { }

  // Ищет ветку (документ) финанс по владельцу  опредиляет базовый путь всех запросов
  async DeterminRootPath(id : string ) {
    this.rootPath = "";
    await this.db.firestore.collection('finances').where('owners','array-contains',id).limit(1).get().then(
      res => {  this.rootPath = ""; if(!res.empty) {this.rootPath =`finances/${res.docs[0].id}`; }}
    )
  }

  ClearRootPath() { 
    this.rootPath = "";
  }
  
  public get RootPath() : string {
    return this.rootPath;
  }
  
  public async NewUsersAllowed() : Promise<boolean> {
    if (this.newUsersAllowed != undefined) {
       return new Promise((resolve) => {resolve(this.newUsersAllowed)});
    }
    
    return this.db.firestore.doc('finances/AppOptions').get().then(snap => {return snap.data().AllowNewAccounts})

  }

  GetStoreges() : Observable<IStorege[]> {
    
    if(!this.rootPath) {
      return of([]);
    }
    
    return this.db.collection(`${this.rootPath}/storeges`).snapshotChanges().pipe(
      map(snapStoreges => {
        return snapStoreges.map(snapStorege => {
          return <IStorege>{id : snapStorege.payload.doc.id, ...snapStorege.payload.doc.data()}
        } )
       })
       )
  }
 
  GetActions(storegeid : string, startPeriod : number , endPeriod : number , pageIndex = 0, pageSize = 20  ) : Observable<iaction[]> {

    if(!this.rootPath) {
      return of([]);
    }

    
    return this.db.collection(`${this.rootPath}/storeges/${storegeid}/actions`,ref => 
      ref.orderBy('actionDate')
         .where('actionDate',">",startPeriod)
         .where('actionDate',"<=",endPeriod)
        //  .startAfter(pageIndex*pageSize)
        //  .limit(pageSize) 
      )
    .snapshotChanges()
    .pipe(
      map(snapActions => {
        
        return snapActions.map(snapAction => {
          return <iaction>{id : snapAction.payload.doc.id, ...snapAction.payload.doc.data()}
        } )
       })
       )

  }

  GetStorege(relativePath : string) : Observable<IStorege> {
      
      return this.db.doc(`${this.RootPath}/${relativePath}`).get()
      .pipe(map(snap => {return <IStorege>{id : snap.id , ...snap.data()}} ), first())
 
  } 

  UpdateStorege(id : string, value : Partial<IStorege>) : Observable<any> {
    if(!id) {
      return from( this.db.collection(`${this.RootPath}/storeges`).add(value));
    }
    
    return from( this.db.doc(`${this.RootPath}/storeges/${id}`).update(value));
  }
 
  DeleteStorege(id : string) : Observable<any> {
    return from(this.db.doc(`${this.RootPath}/storeges/${id}`).delete());
  }

  CreateAction(storegeID : string , action : Partial<iaction>) : Observable<any> {
    return from(this.db.collection(`${this.RootPath}/storeges/${storegeID}/actions`).add(action)); 
  }

  DeleteAction(storegeID : string, actionID : string) {
    return from(this.db.doc(`${this.RootPath}/storeges/${storegeID}/actions/${actionID}`).delete());
  }

  UpdateAction(storegeID : string , action : Partial<iaction>) : Observable<any> {
    if(!action.id) {
      return throwError('empty id'); 
    }
    
    return from( this.db.doc(`${this.RootPath}/storeges/${storegeID}/actions/${action.id}`).update(action));
  }

  GetDateID(date : Date): number {
    return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(), date.getUTCDate()+1,0,0,0,0);
  }

  GetStoregeDateCounters(StoregeID : string) : Observable<icounter> {

    if(!this.rootPath) {
      return of({});
    }

    return this.db.collection(`${this.rootPath}/storeges/${StoregeID}/counters`)
      .snapshotChanges()
      .pipe(map(snapCounters => {
          let counter : icounter = {};
          snapCounters.forEach(element => {
            counter[element.payload.doc.id] = (element.payload.doc.data() as icounterelement).countervalue;
          });

          return counter;
           } )
      ) 
  }

  async CreateDateCounter(StoregeID : string, CounterID : string) {
    let counterSnap = await this.db.firestore.doc(`${this.RootPath}/storeges/${StoregeID}/counters/${CounterID}`).get();
    if(!counterSnap.exists) {
      const emptyCounter = {countervalue : 0};
      await this.db.firestore.collection(`${this.RootPath}/storeges/${StoregeID}/counters`).doc(CounterID).set(emptyCounter);
    }
  }

  
}
