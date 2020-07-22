import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Assignment } from 'src/app/_models/assignment';
import { Session } from 'src/app/_models/session';
import { TabsService } from 'src/app/_services/tabs.service';

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
  setTab: string;
  assignments: Assignment[];
  events: Event[];
  session: any;
  mentorTabsArray = ['tab1', 'tab2', 'tab3', 'tab4', 'tab5'];
  swiped: string;

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private _tabsService: TabsService) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.session = data['session'];
      this.assignments = data['assignments'].result;
      this.events = data['events'].result;
      console.log(this.session);
    });

    this.setTab = localStorage.getItem('lastTab') ? localStorage.getItem('lastTab') : 'tab1';
    this._tabsService.tabSelection$.subscribe(
      message => {

        this.setTab = message;

      }
    );

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
          const pageTurn = direction[0] < 0 ? 'next' : 'previous';
          let arrayIndx = this.mentorTabsArray.indexOf(localStorage.getItem('lastTab'));
          // Do whatever you want with swipe
          // const selectedTab = this.getTabMethod();

          if (pageTurn === 'next') {
            if (arrayIndx !== this.mentorTabsArray.length - 1) {
              arrayIndx++;
              arrayIndx++;
              this.swiped = 'tab' + arrayIndx;
            }
          } else if (pageTurn === 'previous') {
              if (arrayIndx !== 0) {
                this.swiped = 'tab' + arrayIndx;
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
