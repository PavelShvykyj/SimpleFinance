
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

  constructor(private router : Router, private activatedrout : ActivatedRoute) {
    const currdate = new Date();
    console.log(new Date(currdate.getFullYear(), currdate.getMonth(), currdate.getDate()));
    this.storege = {id :  this.activatedrout.snapshot.params.storegeID, name : this.activatedrout.snapshot.params.storegeName} 
    this.InitCalendar(currdate.getMonth(), currdate.getFullYear());
  }

  ngOnInit() {
  }

  InitCalendar(month : number, year : number)  {
    this.calendar = [];
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Пн"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Вт"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Ср"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Чт"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Пт"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Сб"
    });
    this.calendar.push({
      status : CalendarElementStatus.Header,
      title : "Вс"
    });

    const  startDate = new Date(year,month,1);
    const  startDay = startDate.getDate()
    const  startweekDay = startDate.getDay() == 0 ? 7 : startDate.getDay();
    const  currdate = new Date();

    for (let index = 1; index < startweekDay; index++){
      this.calendar.push({
        status : CalendarElementStatus.Disabled,
        title : ""
      });
    }

    for (let index = startDay; index < 49; index++) {
      let status : CalendarElementStatus = CalendarElementStatus.Date;
      const date : Date = new Date(year,month,index);
      if( currdate.getDate() == index) {
        console.log('current', date);
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
        date : date
      });
    }
  }



}
