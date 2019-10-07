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

