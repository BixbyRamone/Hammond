import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { UserService } from 'src/app/_services/user.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RoleService } from 'src/app/_services/role.service';
import { GroupToCreate } from 'src/app/_models/groupToCreate';
import { GroupService } from 'src/app/_services/group.service';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.css']
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
    console.dir(this.users);
  }

  resetFilter() {
    this.userParams.studentLevel = 'all';
    this.loadUsers();
  }

  groupUser(user: User) {
    console.dir('groupUsers');
    user.grouped = true;
    console.dir(user);

    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      this.groupToRegister.studentIds.push(user.id);
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      this.groupToRegister.volunteerIds.push(user.id);
    }
  }

  ungroupUser(user: User) {
    console.dir('ungroupUsers');
    user.grouped = false;
    console.dir(user);
    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      const elementToRemove = this.groupToRegister.studentIds.indexOf(user.id);
      this.groupToRegister.studentIds.splice(elementToRemove, 1);
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      const elementToRemove = this.groupToRegister.volunteerIds.indexOf(user.id);
      this.groupToRegister.volunteerIds.splice(elementToRemove, 1);
    }
  }

  register() {
    this.groupService.register(this.groupToRegister).subscribe(() => {
      this.alertify.success('Group Registered');
    }, error => {
      console.dir(error);
      this.alertify.error(error);
    });
  }

  backup() {
    console.log('backup');
    this.cancel.emit(false);
  }

}
