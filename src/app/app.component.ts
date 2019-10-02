import { Component, OnDestroy } from '@angular/core';
import { FbAuthService } from './services/fb-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'SimpleKassa';

  constructor(private auth : FbAuthService) {}
  ngOnDestroy() { 
    this.auth.LogOut();
  }

}
