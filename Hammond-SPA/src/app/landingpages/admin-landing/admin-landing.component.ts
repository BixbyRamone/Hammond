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

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  @ViewChild('adminTabs') adminTabs: TabsetComponent;
  // user: User;
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
      .subscribe((res:  User[]) => {
      this.users = res;
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

  // loadAssignments() {
  //   this.assignmentService.getAssignments(/*this.pagination.currentPage*/ 1, /*this.pagination.itemsPerPage*/5)
  //     .subscribe((res:  PaginatedResult<Assignment[]>) => {
  //       this.assignments = res.result;
  //       this.pagination = res.pagination;
  //       console.log(this.assignments);
  //     }, error => {
  //       this.alertify.error(error);
  //     });

  // }

  loadEvents() {
    this.eventService.getEvents(/*this.pagination.currentPage*/ 1, /*this.pagination.itemsPerPage*/5)
      .subscribe((res: PaginatedResult<Evnt[]>) => {
        this.evnts = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });

  }

  // loadStudents() {
  //   console.log('loadStudents() Clicked');
  //   this.userParams.studentLevel = 'all';
  //   this.userParams.roleName = 'Student';
  //   this.userService.getUsers( 1, 5, this.userParams)
  //   .subscribe((res: PaginatedResult<User[]>) => {
  //     this.users = res.result;
  //     this.pagination = res.pagination;
  //     console.dir(this.users);
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  //   console.log(this.users);
  // }

}
