import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AssingmentService } from 'src/app/_services/assingment.service';

@Component({
  selector: 'app-stud-assignment-tab',
  templateUrl: './stud-assignment-tab.component.html',
  styleUrls: ['./stud-assignment-tab.component.css']
})
export class StudAssignmentTabComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  assignments: Assignment[];
  pagination: Pagination;

  constructor(
    private assignmentService: AssingmentService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assignments = data['assignments'].result;
      this.pagination = data['assignments'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadAssignments();
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
