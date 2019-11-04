import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAction, actionCategory } from './../../../functions/src/models';
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
    actionCategory[actionCategory.sport],
    actionCategory[actionCategory.eat],
    actionCategory[actionCategory.necessary],
    actionCategory[actionCategory.unnecessary],
    actionCategory[actionCategory.pocket],
    actionCategory[actionCategory.chemistry],
    actionCategory[actionCategory.cat],
    actionCategory[actionCategory.clothes],
    actionCategory[actionCategory.education]
  ]

  constructor(
    public dialogRef: MatDialogRef<UpdateActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data : any) { 

    
    this.form = new FormGroup({summ: new FormControl(this.data.summ,Validators.required),
                               description: new FormControl(this.data.desckription),
                               category: new FormControl(actionCategory[this.data.сategory-1],Validators.required)
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
