import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SessionService } from 'src/app/_services/session.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { Session } from 'src/app/_models/session';
import { Location } from '@angular/common';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {
  sessions: Session[];
  pagination: Pagination;
  userParams: any = {};
  studentLevel = [{value: 'all', display: 'All'},
                  {value: 'sophomore', display: 'Sophomores'},
                  {value: 'junior', display: 'Juniors'},
                  {value: 'senior', display: 'Seniors'} ];

  constructor(private route: ActivatedRoute,
              private alertify: AlertifyService,
              private sessionService: SessionService,
              private location: Location) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sessions = data['sessions'].result;
      this.pagination = data['sessions'].pagination;
    });
    this.userParams.studentLevel = 'all';
  }

  loadSessions() {
    this.sessionService.getSessions(this.userParams)
      .subscribe((res: PaginatedResult<Session[]>) => {
        this.sessions = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
        console.log(error);
      });
  }

  resetFilter() {
    // this.userParams.roleName = this.userType.toLowerCase();
    this.userParams.studentLevel = 'all';
    // this.userParams.volunteerType = this.userType.toLowerCase();
    this.pagination.itemsPerPage = 10;
  }

  backup() {
    this.location.back();
  }

}
