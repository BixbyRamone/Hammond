import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { debug } from 'util';

@Component({
  selector: 'app-mentor-stud-list',
  templateUrl: './mentor-stud-list.component.html',
  styleUrls: ['./mentor-stud-list.component.css']
})
export class MentorStudListComponent implements OnInit {
  @Output() cancelAllStudents = new EventEmitter();
  jwtHelper = new JwtHelperService();
  studentLevel: any;
  decodedToken: any;
  users: User[];
  pagination: Pagination;
  userParams: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParams.studentLevel = this.getStudentLevel();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      // this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  getStudentLevel() {
    let info = JSON.parse(localStorage.getItem('user'));
    info = info.studentLevel;
    return info;
  }

  backup() {
    this.cancelAllStudents.emit(false);
  }

}
