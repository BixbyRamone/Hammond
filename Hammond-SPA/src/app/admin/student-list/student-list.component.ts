import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  userParams: any = {};
  userType: string;
  studentLevel = [{value: 'all', display: 'All Grades'}, {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'}, {value: 'senior', display: 'Seniors'} ];
  volunteerType = [{value: 'volunteer', display: 'All Volunteers'},
                  {value: 'mentor', display: 'Mentors'}, {value: 'tutor', display: 'Tutors'} ];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      this.userType = data['userType'];
      debugger
    });
    // this.userType = this.setUserType();
    this.userParams.roleName = this.userType.toLowerCase();
    this.userParams.studentLevel = 'all';
    this.userParams.volunteerType = this.userType.toLowerCase();
  }

  resetFilter() {
    this.userParams.roleName = this.userType.toLowerCase();
    this.userParams.studentLevel = 'all';
    this.userParams.volunteerType = this.userType.toLowerCase();
    this.pagination.itemsPerPage = 10;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    debugger
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  setUserType() {
    const url = window.location.href;
    const arr = url.split('/');

    let stringToReturn = arr[arr.length - 1];
    stringToReturn = stringToReturn.slice(0, stringToReturn.length - 1);
    stringToReturn = stringToReturn.replace(/^./, stringToReturn[0].toUpperCase());

    return stringToReturn;
  }

}
