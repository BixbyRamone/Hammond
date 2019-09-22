import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/_models/role';
import { UserService } from 'src/app/_services/user.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.css']
})
export class GroupRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  users: User[];
  userParams: any = {};
  pagination: Pagination;
  groupHasMent = false;
  groupHasStud = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      console.dir(this.users);
    });
  }

  loadUsers() {
    console.log('loadUsers()');
    this.userService.getUsers(this.pagination.currentPage, 999, this.userParams)
      .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  groupUser(user: User) {
    user.grouped = true;

    if (user.userRoles[0].role.normalizedName === 'STUDENT') {
      this.groupHasStud = true;
    }
    if (user.userRoles[0].role.normalizedName === 'MENTOR') {
      this.groupHasMent = true;
    }
    
  }

  register() {
    console.dir('clicked register!');
  }

  backup() {
    console.log('backup');
    this.cancel.emit(false);
  }

}
