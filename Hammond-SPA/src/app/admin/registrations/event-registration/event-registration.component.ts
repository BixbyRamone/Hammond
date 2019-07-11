import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Evnt } from 'src/app/_models/event';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  evnt: Evnt;

  constructor() { }

  ngOnInit() {
  }

  backup() {
    this.cancel.emit(false);
  }

}
