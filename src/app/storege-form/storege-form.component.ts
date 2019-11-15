import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbbaseService } from '../services/fb-base.service';
import { IStorege } from '../models/istorege';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-storege-form',
  templateUrl: './storege-form.component.html',
  styleUrls: ['./storege-form.component.scss']
})
export class StoregeFormComponent implements OnInit {

  storege : IStorege
  form : FormGroup;
  

  constructor(private router: Router,
              private activatedrout: ActivatedRoute,
              private db: FbbaseService,
              private _snackBar: MatSnackBar,
              ) {
    this.storege =  this.activatedrout.snapshot.data['storege'];
    this.form = new FormGroup({'name' : new FormControl(this.storege.name, Validators.required)})

   }

  ngOnInit() {
  }


  get name() {
    return this.form.get('name');
  }


  getErrorMessage(control : AbstractControl ) : string {
    if (control.hasError('required')) {
      return "поле не должно быть пустым..."
    }

    if (control.hasError('min')) {
      return `минимальное значение ${control.getError('min').min} ...`;
    }

    return "Значение заполнено не верно..."
    
  }

  Save() {
    if(!this.form.valid) {
      /// messege
      return
    }
    console.log('storege.id',this.storege.id);
    this.db.UpdateStorege(this.storege.id, this.form.value).subscribe(
      kassRef=>{
        // UpdateStorege - делает и создание (add) и обновление (update)
        // add - возвращает ссылку а update - void поетому счетчик создаем только для новых т.е.
        // для которых вернуло ссылку (для существующих kassRef - неопределено)
        if(kassRef) {
          this.db.CreateDateCounter(kassRef.id,'storegecounter');
        }
        
        this.router.navigateByUrl('main')},
      err => {
        this._snackBar.open("Извините. Что то пошло не так...","error",{duration: 2500});
      }
    ) 


  }
  Cancel() {
    this.router.navigateByUrl('main');
  }


}
