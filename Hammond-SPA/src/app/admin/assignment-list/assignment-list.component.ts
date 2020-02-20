import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  // @Output() cancel = new EventEmitter();
  // @Output() testssss = new EventEmitter();
  // @Input() loadedAssignments;
  assignments: Assignment[];
  pagination: Pagination;
  assignmentParams: any = {};
  showAssignmentDetail = false;
  detailedAssignment: any = {};
  studentLevel = [{value: 'all', display: 'All Students'}, {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'}, {value: 'senior', display: 'Seniors'} ];

  constructor(
    private assignmentService: AssignmentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assignments = data['assignments'].result;
      this.pagination = data['assignments'].pagination;
    });
    this.assignmentParams.studentLevel = 'all';
  }

  loadAssignments() {
    console.dir('loaded assignments');
    this.assignmentService.getAssignments(this.pagination.currentPage, this.pagination.itemsPerPage, this.assignmentParams)
      .subscribe((res:  PaginatedResult<Assignment[]>) => {
        this.assignments = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  assignmentDetailClick(detailedAssignment: any) {
    this.detailedAssignment = detailedAssignment;
    this.showAssignmentDetail = !this.showAssignmentDetail;
  }

  pageChanged(event: any) {
    this.pagination.currentPage = event.page;
    this.loadAssignments();
  }

  resetFilter() {
    this.pagination.itemsPerPage = 10;
    this.assignmentParams.studentLevel = 'all';
    this.loadAssignments();
  }

}


