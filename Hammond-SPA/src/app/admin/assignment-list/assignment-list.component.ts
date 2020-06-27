import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})
export class AssignmentListComponent implements OnInit {
  assignments: Assignment[];
  operatingRole: string;
  pagination: Pagination;
  assignmentParams: any = {};
  showAssignmentDetail = false;
  detailedAssignment: any = {};
  studentLevel = [{value: 'all', display: 'All Students'}, {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'}, {value: 'senior', display: 'Seniors'} ];

  constructor(
    private assignmentService: AssignmentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.operatingRole = data['operatingRole'];
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

  deleteAssignment(id: number) {
    this.alertify.confirm('Are you sure you want to delete this assignment?', () => {
      this.assignmentService.deleteAssignment(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.alertify.success('Assignment has been deleted');
        this.router.navigate(['/admin/assignments']);
      }, error => {
        this.alertify.error('Failed to delete assignment');
      });
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


