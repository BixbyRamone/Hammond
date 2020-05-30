import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssignmentService } from 'src/app/_services/assignment.service';

@Component({
  selector: 'app-assigment-registration',
  templateUrl: './assigment-registration.component.html',
  styleUrls: ['./assigment-registration.component.css']
})
export class AssigmentRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  assignment: Assignment;
  registerForm: FormGroup;
  section: string;

  constructor(
    private authService: AuthService,
    private assignmentService: AssignmentService,
    private alertify: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createAssignmentForm();
  }

  createAssignmentForm() {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      studentLevel: ['', Validators.required],
      section: ['', Validators.required],
      dateDue: ['', Validators.required],
      assigned: [false, Validators.required],
      subject: [null],
      completed: [false]
    });

  }

  register() {
    if (this.registerForm.value.section !== 'tutor') {
      this.registerForm.value.subject = null;
    }
    if (this.registerForm.valid) {
      this.assignment = Object.assign({}, this.registerForm.value);

      this.assignmentService.register(this.authService.decodedToken.nameid, this.assignment).subscribe(() => {
        this.alertify.success('Registration succesful');
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
    }
  }

  backup() {
    this.cancel.emit(false);
  }

}
