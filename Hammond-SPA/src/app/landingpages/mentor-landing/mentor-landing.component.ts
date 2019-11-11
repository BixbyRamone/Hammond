import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Assignment } from 'src/app/_models/assignment';

@Component({
  selector: 'app-mentor-landing',
  templateUrl: './mentor-landing.component.html',
  styleUrls: ['./mentor-landing.component.css']
})
export class MentorLandingComponent implements OnInit {
  @ViewChild('mentorTabs') mentorTabs: TabsetComponent;
  user: User;
  assignments: Assignment[];

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = data['user'];
      this.assignments = data['assignments'].result;
    });

    console.dir(this.assignments);

    this.route.queryParams.subscribe(params => {
      const selectTab = params['tab'];
      this.mentorTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });
  }

}
