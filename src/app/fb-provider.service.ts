import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FbProviderService {

  constructor(private db : AngularFirestore) {
    
   }
}
