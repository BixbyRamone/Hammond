import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Assignment } from 'src/app/_models/assignment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AssingmentService } from 'src/app/_services/assingment.service';

@Component({
  selector: 'app-assigment-registration',
  templateUrl: './assigment-registration.component.html',
  styleUrls: ['./assigment-registration.component.css']
})
export class AssigmentRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  assignment: Assignment;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private assignmentService: AssingmentService,
    private alertify: AlertifyService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      studentLevel: ['', Validators.required],
      section: ['', Validators.required],
      dateDue: ['', Validators.required],
      assigned: ['', Validators.required],
    });
  }

  register() {

    if (this.registerForm.valid) {
      this.assignment = Object.assign({}, this.registerForm.value);

      this.assignmentService.register(this.assignment).subscribe(() => {
        this.alertify.success('Registration succesful');
      }, error => {
        console.log('error: ' + error);
        this.alertify.error(error);
      });
    }
  }

  backup() {
    this.cancel.emit(false);
  }

}
