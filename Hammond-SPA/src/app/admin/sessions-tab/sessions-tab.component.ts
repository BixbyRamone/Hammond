import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sessions-tab',
  templateUrl: './sessions-tab.component.html',
  styleUrls: ['./sessions-tab.component.css']
})
export class SessionsTabComponent implements OnInit {
  sessionRegisterMode = false;
  sessionListMode = false;

  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    console.log('toggle');
  }

  cancelEventRegistration(modeSwitch: boolean) {
    this.sessionRegisterMode = modeSwitch;
  }

}
