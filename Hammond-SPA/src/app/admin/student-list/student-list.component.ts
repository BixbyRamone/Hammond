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
  studentLevel = [{value: 'all', display: 'All Students'}, {value: 'sophmore', display: 'Sophmores'},
                  {value: 'junior', display: 'Juniors'}, {value: 'senior', display: 'Seniors'} ];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.userParams.roleName = 'student';
    this.userParams.studentLevel = 'all';
    console.log(this.users);
  }

  resetFilter() {
    this.userParams.studentLevel = 'all';
    this.pagination.itemsPerPage = 10;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    console.dir(this.pagination);
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.dir('page changed');
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
    console.log(this.users);
  }

}
