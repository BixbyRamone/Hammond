import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { UserGroup } from 'src/app/_models/usergroup';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-mentor-my-students',
  templateUrl: './mentor-my-students.component.html',
  styleUrls: ['./mentor-my-students.component.css']
})
export class MentorMyStudentsComponent implements OnInit {
  group: Group;
  usergroup: UserGroup[];
  currentUserId: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.group = data['group'];
      this.usergroup = this.group.userGroups;
      console.dir(this.usergroup);
    });
    this.currentUserId = this.authService.decodedToken.nameid;
  }

}
