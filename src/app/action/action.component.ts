import { iaction, actionCategory } from './../models/iaction';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FbbaseService } from '../services/fb-base.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  categoryFormGroup: FormGroup;
  summFormGroup: FormGroup;
  descriptionFormGroup: FormGroup;
  categories : string[] = [
    actionCategory[0],
    actionCategory[1],
    actionCategory[2],
    actionCategory[3],
    actionCategory[4],
    actionCategory[5],
    actionCategory[6],
    actionCategory[7],
    actionCategory[8]
  ]

 
  

  dateID : number;
  selectedDate : Date;
  storegeID: string;
  storegeName: string;

  constructor(private _formBuilder: FormBuilder,
              private router : Router,
              private activatedrout : ActivatedRoute,
              private db : FbbaseService,
              private _snackBar: MatSnackBar
              ) {

                
                this.dateID =  1*(this.activatedrout.snapshot.params.dateID as number);
                this.selectedDate = new Date(this.dateID*1);  
                this.storegeID = this.activatedrout.snapshot.params.storegeID;  
                this.storegeName = this.activatedrout.snapshot.params.storegeName;  
              }

  ngOnInit() {
    
    
    
    this.categoryFormGroup = this._formBuilder.group({
      categoryCtrl: ['', Validators.required]
    });
    this.summFormGroup = this._formBuilder.group({
      summCtrl: [0, Validators.required]
    });

    this.descriptionFormGroup = this._formBuilder.group({
      descriptionCtrl: ['']
    });

    this.db.CreateDateCounter(this.storegeID, this.dateID.toString())

  }



  Cancel() {
    this.router.navigateByUrl(`calendar/${this.storegeID}/${this.storegeName}`)
  }

  Save() {
    if (this.descriptionFormGroup.invalid || this.categoryFormGroup.invalid || this.summFormGroup.invalid) {
      return
    }   


    const action : iaction = {
      category : (this.categories.lastIndexOf(this.categoryFormGroup.value.categoryCtrl)),
      desckription : this.descriptionFormGroup.value.descriptionCtrl,
      summ : (this.summFormGroup.value.summCtrl as number),
      actionDate : this.dateID 
    }
   
    this.db.CreateAction(this.activatedrout.snapshot.params.storegeID, action).subscribe(
      res => {this.router.navigateByUrl(`calendar/${this.storegeID}/${this.storegeName}`)},
      err => { this._snackBar.open('Ошибка при создании затраты...')}

    );


  }


}
