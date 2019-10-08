import admin = require('firebase-admin');
import { IAppOptions } from './models';

admin.initializeApp();

export const db = admin.firestore();
export const auth = admin.auth();

export async function NewAccountsAllowed() : Promise<boolean> {
     return db.doc('finances/AppOptions').get().then(snap =>  (snap.data() as IAppOptions).AllowNewAccounts );
}

export async function UpdateUserDisable(id : string, isDisablwed : boolean) {
    return auth.updateUser(id  , {disabled : isDisablwed})
}

export async function InitStartDatabase(userid : string, userEmail : string | undefined) {
    const financeRef = await db.collection('finances').add({name : userEmail, owners : [userid]});
    const storegeRef = await db.doc(`finances/${financeRef.id}`).collection('storeges').add({name : "Касса по умолчнаию"});
    await db.doc(`finances/${financeRef.id}/storeges/${storegeRef.id}`).collection('counters').add({id : 'StoregeCounter', countervalue : 0 })
}
