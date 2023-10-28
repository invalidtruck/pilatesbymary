import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  today = new Date(Date.now()).toISOString() 
  date: string | undefined;
  type: 'string'|undefined; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  constructor() { }

 
  onDateSelected($event:any){
        let fechasel = new Date($event.detail.value);
        this.today= $event.detail.value;
  }
}