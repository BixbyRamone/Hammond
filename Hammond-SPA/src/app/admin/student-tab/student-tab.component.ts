import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {
  studentRegisterMode = false;
  studentListMode = false;


  constructor() { }

  ngOnInit() {
  }

  registerToggle() {
    this.studentListMode = false;

    this.studentRegisterMode = true;
  }

  listToggle() {
    this.studentRegisterMode = false;

    this.studentListMode = true;
  }

  cancelStudentRegister(studentRegisterMode: boolean) {
    this.studentRegisterMode = studentRegisterMode;
  }

  cancelStudentList(modeSwitch: boolean) {
    this.studentListMode = modeSwitch;
  }

  // clearDisplays() {
  //   this.studentRegisterMode = false;
  //   this.studentListMode = false;
  // }


}
