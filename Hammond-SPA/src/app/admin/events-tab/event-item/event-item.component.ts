import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Evnt } from 'src/app/_models/event';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { EventService } from 'src/app/_services/event.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.css']
})
export class EventItemComponent implements OnInit {
  @Input() event: Evnt;
  @Output() reload = new EventEmitter;

  constructor(
    private alertify: AlertifyService,
    private eventService: EventService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteEvent(evnt: Evnt) {
    this.alertify.confirm('Are you certain that you want to delete ' + evnt.title , () => {
      this.eventService.deleteEvent(this.authService.decodedToken.nameid, evnt.id).subscribe(() => {
        this.alertify.success('Event has been deleted');
        // this.router.navigate(['/admin/events']);
        this.reloadEvents();
      }, error => {
        console.log(error);
        this.alertify.error('Failed to delete this event');
      });
    });
  }

  reloadEvents() {
    this.reload.emit(true);
  }

}
