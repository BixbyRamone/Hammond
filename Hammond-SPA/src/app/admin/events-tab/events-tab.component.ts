import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-tab',
  templateUrl: './events-tab.component.html',
  styleUrls: ['./events-tab.component.css']
})
export class EventsTabComponent implements OnInit {
  eventRegisterMode = false;
  eventListMode = false;

  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    this.eventListMode = false;

    this.eventRegisterMode = true;
  }

  listToggle() {
    this.eventRegisterMode = false;

    this.eventListMode = true;
  }

  cancelEventRegistration(modeSwitch: boolean) {
    this.eventRegisterMode = modeSwitch;
  }

  cancelEventList(modeSwitch: boolean) {
    this.eventListMode = modeSwitch;
  }

}
