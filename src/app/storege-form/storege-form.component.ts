import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FbbaseService } from '../services/fb-base.service';
import { IStorege } from '../models/istorege';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-storege-form',
  templateUrl: './storege-form.component.html',
  styleUrls: ['./storege-form.component.scss']
})
export class StoregeFormComponent implements OnInit {

  storege : IStorege
  form : FormGroup;
  

  constructor(private router : Router, private activatedrout : ActivatedRoute, private db : FbbaseService ) {
    this.storege =  this.activatedrout.snapshot.data['storege'];
    this.form = new FormGroup({'name' : new FormControl(this.storege.name, Validators.required)})

   }

  ngOnInit() {
  }


  get name() {
    return this.form.get('name');
  }


  getErrorMessage(control : FormControl ) : string {
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

    this.db.UpdateStorege(this.storege.id, this.form.value).subscribe(
      res=>{ this.router.navigateByUrl('main')},
      err => {}
    ) 


  }
  Cancel() {
    this.router.navigateByUrl('main');
  }


}
