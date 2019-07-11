import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {
  studentRegisterMode = false;
  studentListMode = false;
  dropBoxMode = false;


  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    this.studentListMode = false;
    this.dropBoxMode = false;

    this.studentRegisterMode = true;
  }

  listToggle() {
    this.studentRegisterMode = false;
    this.dropBoxMode = false;

    this.studentListMode = true;
  }

  dropBoxToggle() {
    this.studentListMode = false;
    this.studentRegisterMode = false;

    this.dropBoxMode = true;
  }

  cancelStudentRegister(studentRegisterMode: boolean) {
    this.studentRegisterMode = studentRegisterMode;
  }

  cancelStudentList(modeSwitch: boolean) {
    this.studentListMode = modeSwitch;
  }

  cancelDropBox(modeSwitch: boolean) {
    this.dropBoxMode = modeSwitch;
  }

  genericCancelTest(modeSwitch: boolean, toBeSwitched: boolean) {
    toBeSwitched = modeSwitch;
  }

  // clearDisplays() {
  //   this.studentRegisterMode = false;
  //   this.studentListMode = false;
  // }


}
