import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/_services/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Evnt } from 'src/app/_models/event';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  editForm: FormGroup;
  event: Evnt;

  constructor(private eventService: EventService,
              private route: ActivatedRoute,
              private router: Router,
              private fb: FormBuilder,
              private alertify: AlertifyService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.event = data['evnt'];
      this.createEventForm();
    });
  }

  createEventForm() {
    this.editForm = this.fb.group({
      id: [this.event.id],
      title: [this.event.title, Validators.required],
      content: [this.event.content, Validators.required],
      eventDate: [this.event.eventDate, Validators.required],
      createdBy: [this.event.createdBy]
    });
  }

  updateEvent(id: number) {
    if (this.editForm.valid) {
      this.event = Object.assign({}, this.editForm.value);

      this.eventService.updateEvent(this.authService.decodedToken.nameid, this.event).subscribe(() => {
        this.alertify.success('Event updated');
        this.router.navigate(['/admin/events']);
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
    }
  }

  deleteEvent() {
    this.alertify.confirm('Are you certain you want to delete this event?' , () => {
      this.eventService.deleteEvent(this.authService.decodedToken.nameid, this.event.id).subscribe(() => {
        this.alertify.success('Event has been deleted');
        this.router.navigate(['/admin/events']);
      }, error => {
        console.log(error);
        this.alertify.error('Failed to delete this event');
      });
    });
  }

}
