import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { GroupService } from 'src/app/_services/group.service';
import { Group } from 'src/app/_models/group';
import { Assignment } from 'src/app/_models/assignment';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { EventService } from 'src/app/_services/event.service';
import { Evnt } from 'src/app/_models/event';
// import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  @ViewChild('adminTabs') adminTabs: TabsetComponent;
  private swipeCoord?: [number, number];
  private swipeTime?: number;
  users: User[];
  groups: Group[];
  evnts: Evnt[];
  // assignments: Assignment[];
  userParams: any = {};
  pagination:  Pagination;

  constructor(
    private userService: UserService,
    private assignmentService: AssignmentService,
    private eventService: EventService,
    private groupService: GroupService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe( data => {
    //   debugger
    //   this.user = data['user'];
    //   this.pagination = data['users'].pagination;
    // });

    this.route.queryParams.subscribe(params => {
      const selectTab = params['tab'];
      this.adminTabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });
  }

  groupLoads() {
    this.loadUngroupedUsers();
    this.loadUserGroups();
  }

  loadUngroupedUsers() {
    this.userParams.getUngrouped = true;
    this.userService.getUngroupedUsers(this.userParams)
      .subscribe((res:  PaginatedResult<User[]>) => {
      this.users = res.result;
    }, error => {
      this.alertify.error(error);
    });
  }

  loadUserGroups() {
    this.groupService.getGroups(/*this.pagination.currentPage*/ 1, /*this.pagination.itemsPerPage*/5)
      .subscribe((res:  PaginatedResult<Group[]>) => {
        this.groups = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  loadEvents() {
    this.eventService.getEvents(/*this.pagination.currentPage*/ 1, /*this.pagination.itemsPerPage*/5)
      .subscribe((res: PaginatedResult<Evnt[]>) => {
        this.evnts = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
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
            if (selectedTab !== this.adminTabs.tabs.length - 1) {
              this.adminTabs.tabs[selectedTab + 1].active = true;
            }
          } else if (swipe === 'previous') {
              if (selectedTab !== 0) {
                this.adminTabs.tabs[selectedTab - 1].active = true;
              }
          }
      }
    }
  }

  getTabMethod() {
    for (let index = 0; index < this.adminTabs.tabs.length; index++) {
      if (this.adminTabs.tabs[index].active === true) {
        return index;
      }
    }
  }

}
