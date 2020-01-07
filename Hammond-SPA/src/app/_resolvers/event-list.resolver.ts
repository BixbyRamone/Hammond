import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Evnt } from '../_models/event';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '../_services/event.service';

@Injectable()
export class EventListResolver implements Resolve<Evnt[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(private eventService: EventService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<Evnt[]> {
                debugger
                return this.eventService.getEvents(this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
