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
  userParams: any = {};
  pagination: Pagination;
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
      this.users = data['users'].result;
    });
    this.userParams.studentLevel = 'sophomore';
  }

  loadUsers() {
    this.userParams.getUngrouped = true;
    this.userService.getUngroupedUsers(this.userParams)
      .subscribe((res:  User[]) => {
      this.users = res;
    }, error => {
      this.alertify.error(error);
    });
  }

  resetFilter() {
    this.userParams.studentLevel = 'all';
    this.loadUsers();
  }

  groupUser(user: User) {
    user.grouped = true;

    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      this.groupToRegister.studentIds.push(user.id);
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      this.groupToRegister.volunteerIds.push(user.id);
    }
    console.dir(this.groupToRegister);

    this.isGroup++;
  }

  ungroupUser(user: User) {
    user.grouped = false;
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
    // this._document.defaultView.location.reload();
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
