import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Session } from '../_models/session';
import { SessionService } from '../_services/session.service';

@Injectable()
export class SessionNextResolver implements Resolve<Session> {
    userParams: any = {};

    constructor(
        private sessionService: SessionService,
        private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Session> {
        this.userParams.studentLevel = this.setUserParams();
        this.userParams.getNextSession = true;
        return this.sessionService.getNextSession(this.userParams).pipe(
            catchError(error => {
                return of(null);
            })
        );
    }

    setUserParams() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user.studentLevel) {
            user.studentLevel = 'all';
        }

        return user.studentLevel;
    }
}
