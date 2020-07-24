import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/_models/group';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { GroupService } from 'src/app/_services/group.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { PaginatedResult, Pagination } from 'src/app/_models/pagination';
import { Location } from '@angular/common';
import { UserService } from 'src/app/_services/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {
  modalRef: BsModalRef;
  groups: Group[];
  pagination: Pagination;
  userParams: any = {};
  students: User[];
  mentors: User[];
  studentPagination: Pagination;
  mentorPagination: Pagination;
  studentLevel = [{value: 'all', display: 'All'},
                  {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];

  constructor(
      private route: ActivatedRoute,
      private alertify: AlertifyService,
      private groupService: GroupService,
      private authService: AuthService,
      private location: Location,
      private userService: UserService,
      private modalService: BsModalService
    ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.groups = data['groups'].result;
      this.pagination = data['groups'].pagination;
      this.students = data['students'].result;
      this.studentPagination = data['students'].pagination;
      this.mentors = data['mentors'].result;
      this.mentorPagination = data['mentors'].pagination;
    });
    console.dir(this.groups);
    this.userParams.studentLevel = 'all';
  }

  loadGroups() {
    this.groupService.getGroups(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<Group[]>) => {
        this.groups = res.result;
        console.log(this.groups);
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
        console.log(error);
      });
  }

  disbandGroup(id: number) {
    console.dir(this.groupService);
    this.alertify.confirm('Are you sure you want to disband this group?', () => {
      this.groupService.disbandGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.loadGroups();
        this.alertify.success('Group has been disbanded');
      }, error => {
        this.alertify.error('Failed to disband group');
      });
    });
  }

  removeMember(ug: any) {
    if (ug.group.userGroups.length === 0) {
      this.disbandGroup(ug.group.id);
    } else {
      console.dir(ug);
      const id: number = ug.user.id;
      this.alertify.confirm('Remove ' + ug.user.firstName + ' ' + ug.user.lastName + ' from this group?', () => {
      this.groupService.removeUserFromGroup(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.loadGroups();
        this.alertify.success('User has been removed from group');
          }, error => {
         this.alertify.error('Failed to remove user from group');
            console.log(error);
        });
      });
    }
  }

  loadStudents(studentLevel: string) {
    this.userParams.studentLevel = studentLevel;
    this.userParams.getUngrouped = true;
    this.userParams.roleName = 'student';
    this.studentPagination.itemsPerPage = 7;
    this.userService.getUngroupedUsers(this.userParams, this.studentPagination.currentPage, this.studentPagination.itemsPerPage)
      .subscribe((res:  PaginatedResult<User[]>) => {
      this.students = res.result;
      this.studentPagination = res.pagination;
      // for (let index = 0; index < this.users.length; index++) {
      //   const element = this.users[index];
      //   for (let i = 0; i < this.groupToRegister.studentIds.length; i++) {
      //     if (this.groupToRegister.studentIds[i] === element.id) {
      //       element.grouped = true;
      //     }
      //   }
      // }
    }, error => {
      this.alertify.error(error);
    });
    this.userParams.roleName = null;
  }

  resetFilter() {
    // this.userParams.roleName = this.userType.toLowerCase();
    this.userParams.studentLevel = 'all';
    // this.userParams.volunteerType = this.userType.toLowerCase();
    this.pagination.itemsPerPage = 10;
    this.loadGroups();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadGroups();
  }

  openModal(template: TemplateRef<any>, studentLevel: string) {
    this.loadStudents(studentLevel);
    this.modalRef = this.modalService.show(template);
  }

  studentPageChanged(event: any, studentLevel: string): void {
    this.studentPagination.currentPage = event.page;
    this.loadStudents(studentLevel);
  }

  backup() {
    this.location.back();
  }

}
