import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  @Output() cancel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  backup() {
    this.cancel.emit(false);
  }

}