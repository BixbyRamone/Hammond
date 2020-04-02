import { Component, OnInit } from '@angular/core';
import { Session } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from 'swiper/js/swiper.esm';

@Component({
  selector: 'app-sessions-list',
  templateUrl: './sessions-list.component.html',
  styleUrls: ['./sessions-list.component.css']
})
export class SessionsListComponent implements OnInit {
  sessions: Session[];
  pagination: Pagination;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.sessions = data['sessions'];
    });
  }

}
