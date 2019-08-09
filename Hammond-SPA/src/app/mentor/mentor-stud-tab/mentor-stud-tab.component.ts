import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-stud-tab',
  templateUrl: './mentor-stud-tab.component.html',
  styleUrls: ['./mentor-stud-tab.component.css']
})
export class MentorStudTabComponent implements OnInit {
  myStudentsMode = false;
  allStudentsMode = false;

  constructor() { }

  ngOnInit() {
  }

  myStudentsModeToggle() {
    this.myStudentsMode = true;
    this.allStudentsMode = false;
  }

  allStudentsModeToggle() {
    this.allStudentsMode = true;
    this.myStudentsMode = false;
  }

  cancelMyStudentsMode(modeswitch: boolean) {
    this.myStudentsMode = modeswitch;
  }

  cancelAllStudentsMode(modeswitch: boolean) {
    this.allStudentsMode = modeswitch;
  }

}
