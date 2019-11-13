import { icounter } from './../models/icounter';
import { iaction } from './../models/iaction';
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Observable, BehaviorSubject, of,  zip, combineLatest } from 'rxjs';
import { FbbaseService } from '../services/fb-base.service';
import { catchError, finalize, first } from 'rxjs/operators';
import { ireport } from '../models/ireport';




export class ReportDataSourse implements DataSource<ireport> {


    private reportSubject = new BehaviorSubject<ireport[]>([]);
    
    private storegetotalSubject = new BehaviorSubject<number>(0);
    public storegetotalSubject$ : Observable<number> = this.storegetotalSubject.asObservable();
    
    
    private loadingSubject = new BehaviorSubject<boolean>(false);

    private categorytotalSubject = new BehaviorSubject<{[key : number ] : number}>({
        0:0,
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0,
        7:0,
        8:0
    });
    public categorytotalSubject$ = this.categorytotalSubject.asObservable();
    
    private categorylistSubject = new BehaviorSubject<number[]>([]);
    public categorylistSubject$ = this.categorylistSubject.asObservable();

    constructor( private db : FbbaseService) {


    }

    connect(collectionViewer: CollectionViewer): Observable<ireport[]> {
        
        return this.reportSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.reportSubject.complete();
        this.loadingSubject.complete();
        this.storegetotalSubject.complete();
        this.categorytotalSubject.complete();
        this.categorylistSubject.complete();
    }

    Loadreports(storegeid : string, startPeriod : number , endPeriod : number , pageIndex = 0, pageSize = 20) {
        console.log('params');
        console.log(storegeid);
        console.log(startPeriod);
        console.log(endPeriod);
       
        this.loadingSubject.next(true);
        const resoults$ = combineLatest(
            this.db.GetStoregeDateCounters(storegeid).pipe(first()),
            this.db.GetActions(storegeid,startPeriod,endPeriod).pipe(first())
         );
        
        resoults$.pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe(resoults => {
            console.log(resoults)
            if(resoults.length == 0){
                this.categorylistSubject.next([]);
                this.categorytotalSubject.next({
                    0:0,
                    1:0,
                    2:0,
                    3:0,
                    4:0,
                    5:0,
                    6:0,
                    7:0,
                    8:0
                });
                this.storegetotalSubject.next(0);
                this.reportSubject.next([]);     
            } 
            else {
                let categorylist : number[] = [];
                let categorytotal : {[key : number ] : number} = {
                    0:0,
                    1:0,
                    2:0,
                    3:0,
                    4:0,
                    5:0,
                    6:0,
                    7:0,
                    8:0
                }; 
                let storegetotal : number = 0; 
                let reports : ireport[] = []
                const datecounter: icounter = resoults[0];
                const actions: iaction[] = resoults[1];
                const datecounternames : string[] = Object.getOwnPropertyNames(datecounter);

                datecounternames.forEach(datecountername => {
                    if(datecountername != 'storegecounter' && +datecountername>=startPeriod && +datecountername<=endPeriod ) {
                        
                    
                    
                    let report : ireport = {
                        datetotal: datecounter[datecountername],
                        date: this.db.GetDateByID(+datecountername) 
                    }

                    let dateactions = actions.filter(element => {return element.actionDate == +datecountername });
                    dateactions.forEach(dateaction => {
                        categorylist.push(dateaction.category);
                        storegetotal = storegetotal + dateaction.summ;
                        if(report[dateaction.category] == undefined) {
                            report[dateaction.category] = dateaction.summ;
                        } else {
                            report[dateaction.category] = report[dateaction.category] + dateaction.summ;
                        }
                       
                        
                        categorytotal[dateaction.category] = categorytotal[dateaction.category] + dateaction.summ;
                        
                        
                        
                    });

                    reports.push(report);
                }
                });


                console.log('resoults')
                
                console.log('categorytotal',categorytotal);
                console.log('storegetotal',storegetotal);
                console.log('reports',reports);

                this.categorylistSubject.next(categorylist);
                this.categorytotalSubject.next(categorytotal);
                this.storegetotalSubject.next(storegetotal);
                this.reportSubject.next(reports);
        }     
        })

        // this.db.Getreports(storegeid , startPeriod , endPeriod , pageIndex , pageSize ).pipe(
        //     catchError(() => of([])),
        //     finalize(() => this.loadingSubject.next(false))
        // )
        // .subscribe(reports => {
        //     this.totalSubject.next(this.GetTotals(reports))
        //     this.reportSubject.next(reports)} );
    }


} 