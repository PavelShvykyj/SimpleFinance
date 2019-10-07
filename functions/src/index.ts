

import * as functions from 'firebase-functions';
import {  NewAccountsAllowed, UpdateUserDisable } from './init';

async function OnUserCreatedHanler(id  : string) {
    const NewAccountAllowed : boolean = await NewAccountsAllowed();
    if( !NewAccountAllowed) {
        await UpdateUserDisable(id, true);
    }
}

exports.OnUserCreated = functions.auth.user().onCreate(user =>  OnUserCreatedHanler(user.uid));




// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
