import { Component, OnInit } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { SessionService } from 'src/app/_services/session.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Session } from 'src/app/_models/session';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-session-registration',
  templateUrl: './session-registration.component.html',
  styleUrls: ['./session-registration.component.css']
})
export class SessionRegistrationComponent implements OnInit {
  pagination: Pagination;
  session: Session;
  assignments: Assignment[];
  assignmentsInSession: Assignment[];
  userParams: any = {};
  sessionToCreate = {
    assignmentIds: []
  };
  sessionForm: FormGroup;
  isSession = 0;
  studentLevel = [{value: 'sophomore', display: 'Sophomores'}, {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];

  constructor(private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private alertify: AlertifyService,
              private sessionService: SessionService,
              private authService: AuthService,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assignments = data['assignments'].result;
    });
    this.createSessionForm();
  }

  loadAssignments() {
    this.pagination.itemsPerPage = 15;
    this.assignmentService.getAssignments(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<Assignment[]>) => {
        this.assignments = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  createSessionForm() {
    this.sessionForm = this.fb.group({
      description: [''],
      date: ['']
    });
  }

  groupAssignment(assignment: Assignment) {
    assignment.grouped = true;
    this.sessionToCreate.assignmentIds.push(assignment.id);

    this.createSessionForView(this.sessionToCreate);
    this.isSession++;
    console.log(this.assignmentsInSession);
  }

  ungroupAssignment(assignment: Assignment) {
    assignment.grouped = false;
    const elementToRemove = this.sessionToCreate.assignmentIds.indexOf(assignment.id);
    this.sessionToCreate.assignmentIds.splice(elementToRemove, 1);

    this.createSessionForView(this.sessionToCreate);
    this.isSession--;
  }

  createSessionForView(sessionIdsObj: any) {
    this.assignmentsInSession = [];

    sessionIdsObj.assignmentIds.forEach(id => {
      const sess = this.assignments.find(a => a.id === id);
      // this.session.sessionAssignments.push(sess);
      this.assignmentsInSession.push(sess);
    });
  }

  register() {
    this.session = Object.assign({}, {
      id: null,
      dayOfSession: this.sessionForm.value.date,
      description: this.sessionForm.value.description,
      assignments: this.sessAssignArray(),
    });
    console.log(this.session);
    this.sessionService.register(this.authService.decodedToken.nameid, this.session).subscribe(() => {
      this.alertify.success('Session Created');
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
    this.assignmentsInSession = [];
  }

  sessAssignArray() {
    let newArray = [];
    this.assignmentsInSession.forEach(asgn => {
      newArray.push(asgn);
    });
    return newArray;
  }

}
