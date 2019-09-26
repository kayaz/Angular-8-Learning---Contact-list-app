import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendarPlugins = [dayGridPlugin];
  constructor() { }

  ngOnInit() {
  }

  handleDateClick(arg) {
    alert(arg.dateStr);
  }
  handleEventClick() {
    console.log('Click');
  }
}
