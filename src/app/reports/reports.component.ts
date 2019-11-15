
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReportDataSourse } from './reports-datasourse';
import { Router, ActivatedRoute } from '@angular/router';
import { FbbaseService } from '../services/fb-base.service';
import { MatSnackBar } from '@angular/material';
import { IStoreges } from '../models/istoreges';
import {  actionCategory } from './../models/iaction';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  displayedColumns : string[] = ['Date',
                                  'DateTotal',
                                  actionCategory[0],
                                  actionCategory[1],
                                  actionCategory[2],
                                  actionCategory[3],
                                  actionCategory[4],
                                  actionCategory[5],
                                  actionCategory[6],
                                  actionCategory[7],
                                  actionCategory[8]
                                  ];
  
  dataSource : ReportDataSourse;
  Storeges : IStoreges;
  categories : typeof actionCategory = actionCategory;
  
  startPeriod : number = 0;  
  endPeriod : number = 0;
  form : FormGroup;

  constructor(
    private router : Router,
    private activatedrout : ActivatedRoute,
    private db : FbbaseService,
    private _snackBar: MatSnackBar
    ) {
      console.log( this.activatedrout.snapshot.data);
      console.log(this.displayedColumns);
      this.Storeges =  this.activatedrout.snapshot.data['StoregesData'];
      this.dataSource = new ReportDataSourse(this.db);
  }

  ngOnInit() {
    
    this.form = new FormGroup({
      'startDate': new FormControl(new Date(), Validators.required),
      'endDate': new FormControl(new Date(), Validators.required),
      'storege': new FormControl('', Validators.required),
    })
  }

  GoToStorege() {
    this.router.navigateByUrl('main');
  }

  UpdateReportData() {
    if(this.form.valid) {
      this.dataSource.Loadreports(this.Storeges[this.form.value.storege] ,
                                  this.db.GetDateID(this.form.value.startDate),
                                  this.db.GetDateID(this.form.value.endDate));
    }

  }
}
