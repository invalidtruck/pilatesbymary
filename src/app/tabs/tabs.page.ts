import { UserService } from './../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  isAdmin:boolean= false;
  constructor(private UserService: UserService) {
    this.isAdmin = this.UserService.getUserInfo()?.isAdmin;
  }

}
