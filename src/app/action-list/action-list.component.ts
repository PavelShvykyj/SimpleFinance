import { iaction, actionCategory } from './../models/iaction';
import { Component, OnInit } from '@angular/core';
import { ActionListDataSourse } from './action-list-datasourse';
import { FbbaseService } from '../services/fb-base.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatDatepickerInputEvent, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UpdateActionDialogComponent } from '../update-action-dialog/update-action-dialog.component';




@Component({
  selector: 'app-action-list',
  templateUrl: './action-list.component.html',
  styleUrls: ['./action-list.component.scss']
})
export class ActionListComponent implements OnInit {

  displayedColumns : string[] = ['date','summ','category'];
  
  dataSource : ActionListDataSourse;
  storegeID : string;
  storegeName : string;
  startPeriod : number = 0;  
  endPeriod : number = 0;
  form : FormGroup;


  constructor(  private db : FbbaseService,
                private router : Router,
                private activatedrout : ActivatedRoute,
                private _snackBar: MatSnackBar,
                public dialog: MatDialog
    ) {

    const startDate : Date =  new Date(); 
    this.form = new FormGroup({'startDate' : new FormControl(startDate,Validators.required)}); 
    this.UpdatePeriod(startDate);  
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
  }

  GetDate(id : number) : Date {
    return new Date(id);
  }

  GetCategory(category) : string {
    return actionCategory[category];
  } 

  get startDate() {
    return this.form.get('startDate');
  }

  GoToStorege() {
    this.router.navigateByUrl('main')
  }

  GoToCalendar() {
    this.router.navigateByUrl(`calendar/${this.storegeID}/${this.storegeName}`);
  }
    
  OnStartDateInput(event : MatDatepickerInputEvent<Date>) {
    this.UpdatePeriod(event.value);
    this.dataSource.LoadActions(this.storegeID,this.startPeriod,this.endPeriod,0,100)
  }

  EditAction(action : Partial<iaction>) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {'top' : '0'};
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.data = action;
    let EditDialogRef : MatDialogRef<UpdateActionDialogComponent> =  this.dialog.open(UpdateActionDialogComponent,dialogConfig);
    
    
    EditDialogRef.afterClosed().subscribe(res =>{
      if(res.answer != 'save') {
        return;
      }
      this.db.UpdateAction(this.storegeID,res.action).subscribe(updateres => {
        this._snackBar.open("Изменения сохранены","Ok",{duration: 1000});
        err => {
          this._snackBar.open(err,"error",{duration: 1000});  
        }
      })
      this.dataSource.LoadActions(this.storegeID,this.startPeriod,this.endPeriod,0,100);
    });

  }

  DeleteAction(actionID : string) {
    let SnackRef = this._snackBar.open("Нажмите чтобы удалить ->","delete",{duration: 2000});
    SnackRef.onAction().subscribe(() =>this.db.DeleteAction(this.storegeID, actionID).subscribe(
      () => this.dataSource.LoadActions(this.storegeID,this.startPeriod,this.endPeriod,0,100)
    ))
  }
}
