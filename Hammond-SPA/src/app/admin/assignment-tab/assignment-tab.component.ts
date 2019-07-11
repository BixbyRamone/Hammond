import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment-tab',
  templateUrl: './assignment-tab.component.html',
  styleUrls: ['./assignment-tab.component.css']
})
export class AssignmentTabComponent implements OnInit {
  assignmentListMode = false;
  assignmentRegisterMode = false;

  constructor() { }

  ngOnInit() {
  }

  listToggle() {
    this.assignmentRegisterMode = false;
    this.assignmentListMode = true;
  }

  registerToggle() {
    this.assignmentListMode = false;
    this.assignmentRegisterMode = true;
  }

  cancelList(modeSwitch: boolean) {
    this.assignmentListMode = modeSwitch;
  }

  cancelRegistration(modeSwitch: boolean) {
    this.assignmentRegisterMode = modeSwitch;
  }

}
