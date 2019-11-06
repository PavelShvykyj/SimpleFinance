import { icounter } from './../models/icounter';
import { Observable } from 'rxjs';
import { FbbaseService } from './../services/fb-base.service';

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IStorege } from '../models/istorege';
import { icalendar, CalendarElementStatus } from '../models/icalendar';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  counter : icounter = {};
  total : number = 0;
  storege : IStorege;
  calendar : icalendar[];
  calendarElementStatus : typeof CalendarElementStatus  = CalendarElementStatus; 
  colors = {
    "Header"  : "primary", 
    "Disabled" : "primary", 
    "Current" :  "warn",  
    "Weekend" : "accent",
    "Date" : "primary"

  }

  constructor(private router : Router, private activatedrout : ActivatedRoute,private db : FbbaseService) {
    const currdate = new Date();
    this.InitCalendar(currdate.getMonth(), currdate.getFullYear());
    this.storege = {id :  this.activatedrout.snapshot.params.storegeID, name : this.activatedrout.snapshot.params.storegeName} 
    
 
    this.db.GetStoregeDateCounters(this.storege.id).subscribe(
      counter => { this.counter = counter; this.InjectCounterInCalendar(); } 
    );
    
    
  }

  ngOnInit() {
  }

  InjectCounterInCalendar() {
    this.total = 0;
    this.calendar.forEach(calendarelement => {
      this.SetCountervalue(calendarelement)
    });


  }

  InitCalendar(month : number, year : number)  {
    this.calendar = [];
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Пн",
      counter : ""

    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Вт",
      counter : ""
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Ср",
      counter : ""
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Чт",
      counter : ""
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Пт",
      counter : ""
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Сб",
      counter : ""
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Вс",
      counter : ""
    });

    const  startDate = new Date(year,month,1,0,0,0,0);
    const  startDay = startDate.getDate()
    const  startweekDay = startDate.getDay() == 0 ? 7 : startDate.getDay();
    const  currdate = new Date();

    for (let index = 1; index < startweekDay; index++){
      this.calendar.push({
        status : CalendarElementStatus.Disabled,
        title : "",
        counter : ""
      });
    }

    for (let index = startDay; index < 49; index++) {
      let status : CalendarElementStatus = CalendarElementStatus.Date;
      const date : Date = new Date(year,month,index,0,0,0,0);
      if( currdate.getDate() == index) {
        status = CalendarElementStatus.Current
      } 
      else if(date.getMonth() != month) {
        status = CalendarElementStatus.Disabled
      }

      else if(date.getDay()==6 || date.getDay()==0) {
        status = CalendarElementStatus.Weekend
      }
      this.calendar.push({
        status : status,
        title : date.getDate().toString(),
        date : date,
        counter : ""
      });
    }
  }

  SetCountervalue(element : icalendar)  {
   
   if(element.date == undefined) {
    element.counter = "";
    return
   }
    
    const  id = this.GetDateID(element.date).toString();
    
    if (this.counter[id] == undefined) {
      element.counter = "";
    } else {
      element.counter = this.counter[id].toString();
      this.total = this.total + this.counter[id];
    }
  }

  GoToAction(element : icalendar) {
    this.router.navigateByUrl(`action/${this.GetDateID(element.date)}/${this.storege.id}/${this.storege.name}`);
  }

  GoToActionList() {
    this.router.navigateByUrl(`actionlist/${this.storege.id}/${this.storege.name}`);
  }

  GoToStorege() {
    this.router.navigateByUrl('main')
  }
  


  GetDateID(date : Date): number {
    return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(), date.getUTCDate()+1,0,0,0,0);
  }


}
