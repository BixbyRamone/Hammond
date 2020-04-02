import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Session } from '../_models/session';
import { SessionService } from '../_services/session.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SessionListResolver implements Resolve<Session[]> {
    pageNumber = 1;
    pageSize = 10;
    userParams: any = {};

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<Session[]> {
                return this.sessionService.getSessions().pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
