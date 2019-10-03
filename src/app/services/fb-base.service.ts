import { IStorege } from './../models/istorege';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';
import { store } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class FbbaseService {

  private rootPath : string;

  constructor(private db : AngularFirestore) { }

  // Ищет ветку (документ) финанс по владельцу  опредиляет базовый путь всех запросов
  DeterminRootPath(id : string ) {
    this.rootPath = "";
    this.db.firestore.collection('finances').where('owners','array-contains',id).limit(1).get().then(
      res => {  this.rootPath = ""; if(!res.empty) {this.rootPath =`finances/${res.docs[0].id}`}}
    )
  }

  ClearRootPath() { 
    this.rootPath = "";
  }
  
  public get RootPath() : string {
    return this.rootPath;
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

  test() {
    console.log(`${this.rootPath}/storeges`);
    this.db.collection(`${this.rootPath}/storeges`).get().subscribe(res => console.log('called ',res));
    

  }

}
