import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteers-tab',
  templateUrl: './volunteers-tab.component.html',
  styleUrls: ['./volunteers-tab.component.css']
})
export class VolunteersTabComponent implements OnInit {
  volunteerRegisterMode = false;
  volunteerListMode = false;

  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    this.volunteerRegisterMode = true;
    this.volunteerListMode = false;
  }

  listToggle() {
    this.volunteerListMode = true;
    this.volunteerRegisterMode = false;
  }

  cancelVolunteerRegister(modeSwitch: boolean) {
    this.volunteerRegisterMode = modeSwitch;
  }

  cancelVolunteerList(modeSwitch: boolean) {
    this.volunteerListMode = modeSwitch;
  }

}
