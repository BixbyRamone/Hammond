import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Group } from 'src/app/_models/group';
import { UserGroup } from 'src/app/_models/usergroup';

@Component({
  selector: 'app-mentor-my-students',
  templateUrl: './mentor-my-students.component.html',
  styleUrls: ['./mentor-my-students.component.css']
})
export class MentorMyStudentsComponent implements OnInit {
  group: Group;
  usergroup: UserGroup[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.group = data['group'];
      this.usergroup = this.group.userGroups;
      console.dir(this.usergroup);
    });
  }

}
