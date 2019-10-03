import { Component, OnInit, OnDestroy } from '@angular/core';
import { FbbaseService } from '../services/fb-base.service';
import { Subscription } from 'rxjs';
import { IStorege } from '../models/istorege';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'storeges',
  templateUrl: './storeges.component.html',
  styleUrls: ['./storeges.component.scss']
})
export class StoregesComponent implements OnInit, OnDestroy {

  storeges : IStorege[] = [];
  storegesSubs : Subscription;
  isLoading : boolean = false;


  constructor(private db : FbbaseService, private router : Router, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.isLoading = true 
    this.storegesSubs = this.db.GetStoreges()
    .pipe(tap(() => this.isLoading = false ))
     .subscribe(resoult => this.storeges = resoult)
  }

  ngOnDestroy() {
    this.storegesSubs.unsubscribe();
  }

  Edit(id : string) {
    this.router.navigateByUrl(`storege/${id}`)
  }

  Delete(id : string) {

    let snack = this._snackBar.open("Для удаления нажмите -->", "Delete", {
      duration: 5000,
    });

    snack.afterDismissed().subscribe(res => {
      if(res.dismissedByAction) {
        this.db.DeleteStorege(id);
      }
    })
  }

}
