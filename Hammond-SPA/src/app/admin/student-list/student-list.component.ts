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
  @Output() cancelList = new EventEmitter();
  @Input() users;
  @Input() pagination: Pagination;
  // users: User[];
  // pagination: Pagination;
  userParams: any = {};
  studentLevel = [{value: 'null', display: 'All Students'}, {value: 'sophmore', display: 'Sophmores'},
                  {value: 'junior', display: 'Juniors'}, {value: 'senior', display: 'Seniors'} ];

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.users = data['users'].result;
    //   this.pagination = data['users'].pagination;
    // });
    console.log(this.users);
  }

  resetFilter() {
    this.userParams.studentLevel = 'all';
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(1, 20, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  backup() {
    this.cancelList.emit(false);
  }

}
