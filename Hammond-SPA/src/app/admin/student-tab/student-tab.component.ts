import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {
  @Input() loadedStudents;
  @Input() pagination: Pagination ;
  studentRegisterMode = false;
  studentListMode = false;
  dropBoxMode = false;
  userParams: any = {};
  // pagination:  Pagination;
  // users: User[];


  constructor(private userService: UserService,
    private alertify: AlertifyService) { }

  ngOnInit() {
  }

  registerToggle() {
    this.studentListMode = false;
    this.dropBoxMode = false;

    this.studentRegisterMode = true;
  }

  listToggle() {
    this.studentRegisterMode = false;
    this.dropBoxMode = false;

    this.studentListMode = true;
  }

  dropBoxToggle() {
    this.studentListMode = false;
    this.studentRegisterMode = false;

    this.dropBoxMode = true;
  }

  cancelStudentRegister(studentRegisterMode: boolean) {
    this.studentRegisterMode = studentRegisterMode;
  }

  cancelStudentList(modeSwitch: boolean) {
    this.studentListMode = modeSwitch;
  }

  cancelDropBox(modeSwitch: boolean) {
    this.dropBoxMode = modeSwitch;
  }

  loadStudents() {
    console.log('loadStudents() Clicked');
    this.userParams.studentLevel = 'all';
    this.userParams.roleName = 'Student';
    this.userService.getUsers(1, 5, this.userParams)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.loadedStudents = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  // clearDisplays() {
  //   this.studentRegisterMode = false;
  //   this.studentListMode = false;
  // }


}
