import { Component, OnInit } from '@angular/core';
import { FbbaseService } from '../services/fb-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private db : FbbaseService) { }

  ngOnInit() {
  }


  test() {
    this.db.test();
  }
}
