

import * as functions   from 'firebase-functions';
import {  NewAccountsAllowed, UpdateUserDisable, InitStartDatabase } from './init';
import { OnActionCreated, OnActionUpdateded, OnActionDeleted } from './action-triggers' 



async function OnUserCreatedHanler(id  : string, mail : string | undefined) {
    const NewAccountAllowed : boolean = await NewAccountsAllowed();
    if( !NewAccountAllowed) {
        await UpdateUserDisable(id, true);
    }
    else {
        await InitStartDatabase(id, mail);
    }
}



exports.OnUserCreated = functions.runWith({ memory: '512MB', timeoutSeconds: 120 }).auth.user().onCreate(user =>  OnUserCreatedHanler(user.uid, user.email));
exports.OnActionCreated = OnActionCreated;
exports.OnActionUpdateded = OnActionUpdateded;
exports.OnActionDeleted =  OnActionDeleted;


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
