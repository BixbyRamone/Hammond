import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssignmentService } from 'src/app/_services/assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/_models/assignment';
import { AuthService } from 'src/app/_services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css']
})
export class AssignmentEditComponent implements OnInit {
  // @ViewChild('editForm') editForm: NgForm;
  assignment: Assignment;
  editForm: FormGroup;

  constructor(private aleritfy: AlertifyService,
              private assignmentService: AssignmentService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private authService: AuthService,
            private router: Router,
            private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.assignment = data['assignment'];
      console.log(this.assignment);
      this.createAssignmentForm();

    });
  }

  createAssignmentForm() {
    this.editForm = this.fb.group({
      id: [this.assignment.id],
      title: [this.assignment.title, Validators.required],
      content: [this.assignment.content, Validators.required],
      studentLevel: [this.assignment.studentLevel, Validators.required],
      section: [this.assignment.section, Validators.required],
      dateDue: [this.assignment.dateDue, Validators.required],
      assigned: [this.assignment.assigned, Validators.required],
      subject: [this.assignment.subject]
    });
  }

  edit() {
    if (this.editForm.valid) {
      this.assignment = Object.assign({}, this.editForm.value);

      this.assignmentService.updateAssignment(this.authService.decodedToken.nameid, this.assignment).subscribe(() => {
        this.aleritfy.success('Assignment updated');
        this.router.navigate(['/admin/assignments']);
      }, error => {
        console.log(error);
        this.aleritfy.error(error);
      });
    }
  }

  backup() {
    this.location.back();
  }

}
