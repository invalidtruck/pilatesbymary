import { Component } from '@angular/core';
import { Route, Router, RouterModule } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private auth:FirebaseService, private r:Router) {}

  LogOut(){
    this.auth.logOut().then(()=>{
      this.r.navigate([""]);
  });
  }
}
