import { Component, OnInit, Output, EventEmitter, Input, Inject } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GroupToCreate } from 'src/app/_models/groupToCreate';
import { GroupService } from 'src/app/_services/group.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.css'],
  animations: [
    trigger('fade', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('1000ms ease-out'))

    ])
  ]
})
export class GroupRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() clicked = new EventEmitter();
  // @Input() users: User[];
  users: User[];
  mentors: User[];
  students: User[];
  usersInGroup: User[] = [];
  userParams: any = {};
  studPagination: Pagination;
  mentPagination: Pagination;
  groupToRegister: GroupToCreate = {
    volunteerIds: [],
    studentIds: []
  };
  show = true;
  isGroup = 0;
  studentLevel = [{value: 'sophomore', display: 'Sophomores'}, {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.students = data['students'].result;
      this.studPagination = data['students'].pagination;
      this.mentors = data['mentors'].result;
      this.mentPagination = data['mentors'].pagination;
    });
    this.userParams.studentLevel = 'sophomore';
  }

  loadUsers() {
    this.loadStudents();
    this.loadMentors();
  }

  loadMentors() {
    this.userParams.getUngrouped = true;
    this.userParams.roleName = 'volunteer';
    this.userService.getUngroupedUsers(this.userParams, this.mentPagination.currentPage, this.mentPagination.itemsPerPage)
      .subscribe((res:  PaginatedResult<User[]>) => {
      this.mentors = res.result;
      this.mentPagination = res.pagination;
      for (let index = 0; index < this.mentors.length; index++) {
        const element = this.mentors[index];
        if (this.usersInGroup.indexOf(element) > -1) {
          element.grouped = true;
        }
      }
    }, error => {
      this.alertify.error(error);
    });
    this.userParams.roleName = null;
  }

  loadStudents() {
    this.userParams.getUngrouped = true;
    this.userParams.roleName = 'student';
    this.userService.getUngroupedUsers(this.userParams, this.studPagination.currentPage, this.studPagination.itemsPerPage)
      .subscribe((res:  PaginatedResult<User[]>) => {
      this.students = res.result;
      this.studPagination = res.pagination;
      for (let index = 0; index < this.students.length; index++) {
        const element = this.students[index];
        for (let i = 0; i < this.groupToRegister.studentIds.length; i++) {
          if (this.groupToRegister.studentIds[i] === element.id) {
            element.grouped = true;
          }
        }
      }
    }, error => {
      this.alertify.error(error);
    });
    this.userParams.roleName = null;
  }

  // resetFilter() {
  //   this.userParams.studentLevel = 'all';
  //   this.loadUsers();
  // }

  groupUser(user: User) {
    user.grouped = true;
    this.usersInGroup.push(user);
    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      this.groupToRegister.studentIds.push(user.id);
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      this.groupToRegister.volunteerIds.push(user.id);
    }
    console.dir(this.groupToRegister);
    console.log(this.usersInGroup);

    this.isGroup++;
  }

  ungroupUser(user: User) {
    user.grouped = false;
    const userToRemove = this.usersInGroup.indexOf(user);
    this.usersInGroup.splice(userToRemove, 1);
    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      const elementToRemove = this.groupToRegister.studentIds.indexOf(user.id);
      this.groupToRegister.studentIds.splice(elementToRemove, 1);
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      const elementToRemove = this.groupToRegister.volunteerIds.indexOf(user.id);
      this.groupToRegister.volunteerIds.splice(elementToRemove, 1);
    }
    console.dir(this.groupToRegister);
    this.isGroup--;
  }

  register() {
    this.groupService.register(this.groupToRegister).subscribe(() => {
      this.alertify.success('Group Registered');
      this.loadUsers();
    }, error => {
      console.dir(error);
      this.alertify.error(error);
    });
    this.toggle();
    this.isGroup = 0;
    this.groupToRegister = {
      volunteerIds: [],
      studentIds: []
    };
    this.usersInGroup = [];
  }

  mentorPageChanged(event: any): void {
    this.mentPagination.currentPage = event.page;
    this.loadMentors();
  }

  studentPageChanged(event: any): void {
    this.studPagination.currentPage = event.page;
    this.loadStudents();
  }


  backup() {
    console.log('backup');
    this.cancel.emit(false);
  }

  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  toggle() {
    this.show = !this.show;
  }

}
