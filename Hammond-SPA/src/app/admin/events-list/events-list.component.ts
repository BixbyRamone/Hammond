import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Evnt } from 'src/app/_models/event';
import { EventService } from 'src/app/_services/event.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {
  // @Output() cancel = new EventEmitter();
  // @Input() evnts;
  pagination: Pagination;
  evnts: Evnt[];
  alertifyMessage: string;

  constructor(
    private eventService: EventService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.evnts = data['evnts'].result;
      this.pagination = data['evnts'].pagination;
      this.alertifyMessage = 'Are you certain that you want to delete ';
    });
  }

  loadEvents() {
    this.eventService.getEvents(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<Evnt[]>) => {
      this.evnts = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  deleteEvent(evnt: Evnt) {
    this.alertify.confirm(this.alertifyMessage + evnt.title , () => {
      this.eventService.deleteEvent(this.authService.decodedToken.nameid, evnt.id).subscribe(() => {
        this.alertify.success('Event has been deleted');
        this.router.navigate(['/admin/events']);
      }, error => {
        console.log(error);
        this.alertify.error('Failed to delete this event');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadEvents();
  }

  backup() {
    this.location.back();
  }

}
