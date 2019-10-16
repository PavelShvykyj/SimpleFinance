import * as functions from 'firebase-functions';
import { IAction } from "./models";
import { db } from "./init";



export const OnActionCreated = functions.firestore.document('/finances/{finanseid}/storeges/{storegeid}/actions/{actionid}')
    .onCreate((snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext) =>
        OnActionCreateHandler(snap, context));

export const OnActionUpdateded = functions.firestore.document('/finances/{finanseid}/storeges/{storegeid}/actions/{actionid}')
    .onUpdate((snap : functions.Change<FirebaseFirestore.DocumentSnapshot> , context: functions.EventContext) =>
        OnActionUpdateHandler(snap , context));


export const OnActionDeleted = functions.firestore.document('/finances/{finanseid}/storeges/{storegeid}/actions/{actionid}')
    .onDelete((snap: FirebaseFirestore.DocumentSnapshot, context: functions.EventContext)=>OnActionDeleteHandler(snap , context))


async function OnActionCreateHandler(snap : FirebaseFirestore.DocumentSnapshot, context : functions.EventContext) {
    return db.runTransaction(async transaction => {
        
        ///finances/QX0Cga7vyvZ5wiJpkNJs/storeges/KOv5g3ZyavbiILcIa8tV
        const action : IAction = (snap.data() as IAction);
        const changedSumm : number  = action.summ ; 
        const actoinDateID : number = action.actionDate;

        const CounterPath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/storegecounter`;
        const CounterRef =  db.doc(CounterPath)
        const BlockedCounterSnap = await transaction.get(CounterRef); 
        const BlockedCounterData = BlockedCounterSnap.data();
        
        const CounterDatePath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/${actoinDateID}`;
        const CounterDateRef =  db.doc(CounterDatePath);
        const BlockedCounterDateSnap = await transaction.get(CounterDateRef); 
        
        
        if(BlockedCounterData) {
            await transaction.set(CounterRef,{countervalue : (BlockedCounterData.countervalue as number)  + changedSumm});
        } 

        
        if(BlockedCounterDateSnap.exists) {
            const BlockedCounterDateData = BlockedCounterDateSnap.data();
            if(BlockedCounterDateData) {
                await transaction.set(CounterDateRef,{countervalue : (BlockedCounterDateData.countervalue as number) + changedSumm});
            } 
        } else {
            await transaction.create(CounterDateRef,{countervalue :  changedSumm});
        }
    })
}

async function OnActionUpdateHandler(changes : functions.Change<FirebaseFirestore.DocumentSnapshot> , context : functions.EventContext) {
    const Before : IAction = (changes.before.data() as IAction);
    const After : IAction = (changes.after.data() as IAction);
    const checkedSumm  = After.summ - Before.summ;

    if(checkedSumm == 0) {
        return new Promise<boolean>(resolve => {resolve(true)});
    }
    
    
    return db.runTransaction(async transaction => {
        
        const actionBefore : IAction = (changes.before.data() as IAction);
        const actionAfter : IAction = (changes.after.data() as IAction);

        const changedSumm  = actionAfter.summ - actionBefore.summ; 
        const actoinDateID = actionBefore.actionDate;

        const CounterPath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/storegecounter`;
        const CounterRef =  db.doc(CounterPath)
        const BlockedCounterSnap = await transaction.get(CounterRef); 
        
        const CounterDatePath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/${actoinDateID}`;
        const CounterDateRef =  db.doc(CounterDatePath);
        const BlockedCounterDateSnap = await transaction.get(CounterDateRef); 
        
        
        const BlockedCounterData = BlockedCounterSnap.data();
        if(BlockedCounterData) {
            await transaction.update(CounterRef,{countervalue : BlockedCounterData.countervalue + changedSumm});
        } 

        
        if(BlockedCounterDateSnap.exists) {
            const BlockedCounterDateData = BlockedCounterDateSnap.data();
            if(BlockedCounterDateData) {
                await transaction.update(CounterDateRef,{countervalue :  changedSumm});
            } 
        } else {
            await transaction.create(CounterDateRef,{countervalue : changedSumm});
        }
    })
}

async function OnActionDeleteHandler(snap : FirebaseFirestore.DocumentSnapshot, context : functions.EventContext) {
    return db.runTransaction(async transaction => {
        
        ///finances/QX0Cga7vyvZ5wiJpkNJs/storeges/KOv5g3ZyavbiILcIa8tV
        const action : IAction = (snap.data() as IAction);
        const changedSumm : number = action.summ; 
        const actoinDateID = action.actionDate;

        const CounterPath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/storegecounter`;
        const CounterRef =  db.doc(CounterPath)
        const BlockedCounterSnap = await transaction.get(CounterRef); 
        const BlockedCounterData = BlockedCounterSnap.data();
        
        const CounterDatePath = `finances/${context.params.finanseid}/storeges/${context.params.storegeid}/counters/${actoinDateID}`;
        const CounterDateRef =  db.doc(CounterDatePath);
        const BlockedCounterDateSnap = await transaction.get(CounterDateRef); 
        
        
        if(BlockedCounterData) {
            await transaction.update(CounterRef,{countervalue : (BlockedCounterData.countervalue as number) - changedSumm});
        } 

        if(BlockedCounterDateSnap.exists) {
            await transaction.delete(CounterDateRef);
        } 
    })

}
