import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  checkAll: boolean;
  unCheckAll: boolean;
  users: User[];
  pagination: Pagination;
  userParams: any = {};
  userType: string;
  usersForDeletionArray = [];
  studentLevel = [{value: 'all', display: 'All Grades'},
                  {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];
  volunteerType = [{value: 'volunteer', display: 'All Volunteers'},
                  {value: 'mentor', display: 'Mentors'},
                  {value: 'tutor', display: 'Tutors'} ];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
      this.userType = data['userType'];
    });
    this.checkAll = false;
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
    this.usersForDeletionArray = [];
  }

  loadUsers() {
    if (!this.checkAll) {
      this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
    }
    this.checkAll = false;
  }

  setUserType() {
    const url = window.location.href;
    const arr = url.split('/');

    let stringToReturn = arr[arr.length - 1];
    stringToReturn = stringToReturn.slice(0, stringToReturn.length - 1);
    stringToReturn = stringToReturn.replace(/^./, stringToReturn[0].toUpperCase());

    return stringToReturn;
  }

  usersForDeletion(userObjs: any) {
    if (userObjs.userIsChecked) {
      this.usersForDeletionArray.push(userObjs.userId);
    }
    if (!userObjs.userIsChecked) {
      const idxToSlice = this.usersForDeletionArray.indexOf(userObjs.userId);
      this.usersForDeletionArray.splice(idxToSlice, 1);
    }
    console.log(this.usersForDeletionArray);
  }

  massDeleteUsers() {
    this.alertify.confirm('Delete selected users?', () => {
      this.userService.massDeleteUsers(this.authService.decodedToken.nameid, this.usersForDeletionArray)
      .subscribe(() => {
        this.alertify.success('Users Deleted');
        this.usersForDeletionArray = [];
        this.loadUsers();
      }, error => {
        this.alertify.error('Deletion Failed');
        this.usersForDeletionArray = [];
        this.loadUsers();
      });
    });
  }

  graduateUsers() {
    this.alertify.confirm('This will move all students and volunteers up to the next grade level. Proceed?',
    () => {
      this.userService.graduateUsers(this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.alertify.success('Students Graduated');
          this.loadUsers();
        }, error => {
          this.alertify.error('Graduation Operation Failed');
        });
    });
  }

  checkAllMethod() {
    for (let index = 0; index < this.users.length; index++) {
      const user = this.users[index];
      user.isChecked = true;
      if (this.usersForDeletionArray.indexOf(user.id) === -1) {
        this.usersForDeletionArray.push(user.id);
      }
    }
    this.checkAll = true;
  }

  unCheckAllMethod() {
    if (this.usersForDeletionArray.length > 0) {
      for (let index = 0; index < this.users.length; index++) {
        const user = this.users[index];
        user.isChecked = false;
        this.usersForDeletionArray = [];
      }
    } else {
      this.checkAllMethod();
    }
  }

}
