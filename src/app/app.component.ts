import { Component, OnInit } from '@angular/core';
import { FbAuthService } from './services/fb-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'SimpleKassa';

  constructor(private auth : FbAuthService) {}

  ngOnInit() {
    let context = this;
    window.addEventListener("beforeunload",  () => {
            context.auth.LogOut();
        }
    );
  }



}
