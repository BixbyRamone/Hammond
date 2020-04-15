import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-volunteers-tab',
  templateUrl: './volunteers-tab.component.html',
  styleUrls: ['./volunteers-tab.component.css']
})
export class VolunteersTabComponent implements OnInit {
  volunteerRegisterMode = false;
  volunteerListMode = false;
  dropBoxMode = false;
  roleToReg: string;
  roleBool: boolean;

  constructor() { }

  ngOnInit() {
    this.roleToReg = 'mentor';
    this.roleBool = false;
  }

  registerToggle() {
    this.volunteerRegisterMode = true;
    this.volunteerListMode = false;
  }

  listToggle() {
    this.volunteerListMode = true;
    this.volunteerRegisterMode = false;
  }

  dropBoxToggle() {
    this.volunteerListMode = false;
    this.volunteerRegisterMode = false;

    this.dropBoxMode = true;
  }

  cancelVolunteerRegister(modeSwitch: boolean) {
    this.volunteerRegisterMode = modeSwitch;
  }

  cancelVolunteerList(modeSwitch: boolean) {
    this.volunteerListMode = modeSwitch;
  }

  cancelDropBox(modeSwitch: boolean) {
    this.dropBoxMode = modeSwitch;
  }

  setVolunteerType() {
    this.roleBool = !this.roleBool;
    if (this.roleBool) {
      this.roleToReg = 'tutor';
    }
    if (!this.roleBool) {
      this.roleToReg = 'mentor';
    }
    console.dir(this.roleToReg);
  }

}
