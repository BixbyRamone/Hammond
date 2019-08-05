import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AssingmentService } from 'src/app/_services/assingment.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-stud-assignment-tab',
  templateUrl: './stud-assignment-tab.component.html',
  styleUrls: ['./stud-assignment-tab.component.css']
})
export class StudAssignmentTabComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Input() student: User;
  user: User;
  detailedAssignment: Assignment;
  assignments: any[];
  pagination: Pagination;
  assignmentViewMode = false;
  assignmentListMode = true;

  constructor(
    private assignmentService: AssingmentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.assignments = this.user.userAssignments;
      console.log(this.assignments);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAssignments();
  }

  listToggle() {
    this.assignmentViewMode = false;
    this.assignmentListMode = true;
    this.detailedAssignment = null;
  }

  detailToggle(passedAssignment) {
    this.detailedAssignment = passedAssignment.assignment;
    console.log(this.detailedAssignment);
    this.assignmentViewMode = true;
    this.assignmentListMode = false;
  }

  loadAssignments() {
    this.assignmentService.getAssignments(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Assignment[]>) => {
      this.assignments = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
