import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Message } from '../_models/message';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { AssignmentService } from '../_services/assignment.service';

@Injectable()
export class AssignmentMessageResolver implements Resolve<Message[]> {
    pageNumber = 1;
    pageSize = 15;
    messageContainer = 'Unread';

    constructor(
            private assignmentService: AssignmentService,
            private router: Router,
            private alertify: AlertifyService,
            private authService: AuthService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
            let id: number;
        if (route.params['assId']) {
            id = route.params['assId'];
        } else {
            id = route.params['id'];
        }
                return this.assignmentService.getAssignmentMessages(this.authService.decodedToken.nameid,
                   id).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving messages');
                        this.router.navigate(['/student']);
                        return of(null);
                    })
                );
            }
}
