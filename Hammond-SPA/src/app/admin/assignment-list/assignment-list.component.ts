import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { Pagination } from 'src/app/_models/pagination';
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
  userParams: any = {};
  studentLevel = [{value: 'all', display: 'All Students'}, {value: 'sophmore', display: 'Sophmores'},
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
  }

}
