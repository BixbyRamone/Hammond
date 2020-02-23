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
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  user: User;
  assignments: Assignment[];
  events: Event[];
  space: '&nbsp;';

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.assignments = data['assignments'].result;
      this.events = data['events'].result;
      console.dir(this.events);
    });

    this.route.queryParams.subscribe(params => {
      const selectTab = params['tab'];
      this.mentorTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });
  }

  swipe(e: TouchEvent, when: string): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();

    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000 //
        && Math.abs(direction[0]) > 30 // Long enough
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) { // Horizontal enough
          const swipe = direction[0] < 0 ? 'next' : 'previous';
          // Do whatever you want with swipe
          const selectedTab = this.getTabMethod();

          if (swipe === 'next') {
            if (selectedTab !== this.mentorTabs.tabs.length - 1) {
              this.mentorTabs.tabs[selectedTab + 1].active = true;
            }
          } else if (swipe === 'previous') {
              if (selectedTab !== 0) {
                this.mentorTabs.tabs[selectedTab - 1].active = true;
              }
          }
      }
    }
  }

  getTabMethod() {
    for (let index = 0; index < this.mentorTabs.tabs.length; index++) {
      if (this.mentorTabs.tabs[index].active === true) {
        return index;
      }
    }
  }

}
