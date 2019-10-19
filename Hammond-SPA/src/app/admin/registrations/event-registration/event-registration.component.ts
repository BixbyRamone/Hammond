import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Evnt } from 'src/app/_models/event';
import { AuthService } from 'src/app/_services/auth.service';
import { EventService } from 'src/app/_services/event.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-registration',
  templateUrl: './event-registration.component.html',
  styleUrls: ['./event-registration.component.css']
})
export class EventRegistrationComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  evnt: Evnt;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private eventService: EventService,
    private alertify: AlertifyService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createEventForm();
  }

  createEventForm() {
    this.registerForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      eventDate: ['']
    });
  }

  registerEvent() {
    if (this.registerForm.valid) {
      this.evnt = Object.assign({}, this.registerForm.value);

      this.eventService.register(this.authService.decodedToken.nameid, this.evnt).subscribe(() => {
        this.alertify.success(this.evnt.title + ' was successfully registered!');
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
