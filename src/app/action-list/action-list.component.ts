import { iaction, actionCategory } from './../models/iaction';
import { Component, OnInit } from '@angular/core';
import { ActionListDataSourse } from './action-list-datasourse';
import { FbbaseService } from '../services/fb-base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  displayedColumns : string[] = ['date','summ','category','buttonsgroup'];
  dataSource : ActionListDataSourse;
  storegeID : string;
  storegeName : string;
  startPeriod : number = 0;  
  endPeriod : number = 0;


  constructor(  private db : FbbaseService,
                private router : Router,
                private activatedrout : ActivatedRoute,
                private _snackBar: MatSnackBar
    ) {


    this.UpdatePeriod(new Date());  
    this.storegeID = this.activatedrout.snapshot.params.storegeID; 
    this.storegeName = this.activatedrout.snapshot.params.storegeName; 
    this.dataSource = new ActionListDataSourse(this.db);
    this.dataSource.LoadActions(this.storegeID,this.startPeriod,this.endPeriod,0,100)
   }

  ngOnInit() {
  }

  UpdatePeriod(date : Date) {
    
    const lastdate = new Date(date.getUTCFullYear(),date.getUTCMonth() + 1, 0);
    this.startPeriod =  Date.UTC(date.getUTCFullYear(),date.getUTCMonth(), 1 ,0,0,0,0);
    this.endPeriod = Date.UTC(date.getUTCFullYear(),date.getUTCMonth(), lastdate.getUTCDate() ,0,0,0,0);
    console.log('start', new Date(this.startPeriod));
    console.log('end', new Date(this.endPeriod));

  }

  GetDate(id : number) : Date {
    return new Date(id);
  }

  GetCategory(category) : string {
    return actionCategory[category];
  } 

  Cancel() {
    this.router.navigateByUrl('main')
  }
}
