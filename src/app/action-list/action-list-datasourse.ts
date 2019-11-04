import { iaction } from '../models/iaction';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of } from 'rxjs';
import { FbbaseService } from '../services/fb-base.service';
import { catchError, finalize } from 'rxjs/operators';


export class ActionListDataSourse implements DataSource<iaction> {


    private actionSubject = new BehaviorSubject<iaction[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);



    constructor( private db : FbbaseService) {


    }

    connect(collectionViewer: CollectionViewer): Observable<iaction[]> {
        
        return this.actionSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.actionSubject.complete();
        this.loadingSubject.complete();
    }

    LoadActions(storegeid : string, startPeriod : number , endPeriod : number , pageIndex = 0, pageSize = 20) {
        this.loadingSubject.next(true);
        this.db.GetActions(storegeid , startPeriod , endPeriod , pageIndex , pageSize ).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(actions => {this.actionSubject.next(actions)} );
    }
} 