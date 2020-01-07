import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Evnt } from 'src/app/_models/event';
import { EventService } from 'src/app/_services/event.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

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

  constructor(
    private eventService: EventService,
    private alertify: AlertifyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      debugger
      this.evnts = data['evnts'].result;
      this.pagination = data['evnts'].pagination;
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

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadEvents();
  }

  // backup() {
  //   this.cancel.emit(false);
  // }

}
