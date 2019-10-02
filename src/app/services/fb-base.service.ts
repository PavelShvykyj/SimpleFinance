import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  
  test() {
    console.log(`${this.rootPath}/storeges`);
    this.db.collection(`${this.rootPath}/storeges`).get().subscribe(res => console.log('called ',res));
    

  }

}
