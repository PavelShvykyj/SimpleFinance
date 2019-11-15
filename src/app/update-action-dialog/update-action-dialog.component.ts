import { FormGroup, FormControl, Validators } from '@angular/forms';
import { actionCategory } from '../models/iaction';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-update-action-dialog',
  templateUrl: './update-action-dialog.component.html',
  styleUrls: ['./update-action-dialog.component.scss']
})
export class UpdateActionDialogComponent implements OnInit {

  form : FormGroup;

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

  constructor(
    public dialogRef: MatDialogRef<UpdateActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) { 

    
    this.form = new FormGroup({summ: new FormControl(this.data.summ,Validators.required),
                               description: new FormControl(this.data.desckription),
                               category: new FormControl(actionCategory[this.data.category],Validators.required)
                              })  
  }

  ngOnInit() {
  }


  Save() {
    if(this.form.invalid) {
      this.form.get("summ").markAsTouched();
      this.form.get("description").markAsTouched();
      this.form.get("category").markAsTouched();
      return;
    }


    const ActionDataUpdated  = {
      id : this.data.id,
      category : (this.categories.lastIndexOf(this.form.value.category)),
      desckription : this.form.value.description,
      summ : (this.form.value.summ as number)
    }
    this.dialogRef.close({answer: 'save', action : ActionDataUpdated });
  }

  Cancel() {
    this.dialogRef.close({answer: 'cancel'});
  }

}
