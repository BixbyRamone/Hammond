import { Injectable } from '@angular/core';
import { Evnt } from '../_models/event';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventService } from '../_services/event.service';

@Injectable()
export class EventViewResolver implements Resolve<Evnt> {
    constructor(
        private eventService: EventService,
        private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Evnt> {
        return this.eventService.getEvent(route.params['id']).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
