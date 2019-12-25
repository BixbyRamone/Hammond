import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-stud-profile-tab',
  templateUrl: './stud-profile-tab.component.html',
  styleUrls: ['./stud-profile-tab.component.css']
})
export class StudProfileTabComponent implements OnInit {
  @Input() student: User;
  constructor() { }

  ngOnInit() {
  }

}
