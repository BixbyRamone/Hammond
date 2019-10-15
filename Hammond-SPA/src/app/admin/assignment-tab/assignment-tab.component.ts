import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-assignment-tab',
  templateUrl: './assignment-tab.component.html',
  styleUrls: ['./assignment-tab.component.css']
})
export class AssignmentTabComponent implements OnInit {
  assignmentListMode = false;
  assignmentRegisterMode = false;
  assignments: Assignment[];
  pagination: Pagination;
  userParams: any = {};

  constructor(
    private assignmentService: AssignmentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  loadAssignments() {
    console.dir('loaded assignments');
    this.assignmentService.getAssignments(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res:  PaginatedResult<Assignment[]>) => {
        this.assignments = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  listToggle() {
    this.assignmentRegisterMode = false;
    this.assignmentListMode = true;
  }

  registerToggle() {
    this.assignmentListMode = false;
    this.assignmentRegisterMode = true;
  }

  cancelList(modeSwitch: boolean) {
    this.assignmentListMode = modeSwitch;
  }

  cancelRegistration(modeSwitch: boolean) {
    this.assignmentRegisterMode = modeSwitch;
  }

}
