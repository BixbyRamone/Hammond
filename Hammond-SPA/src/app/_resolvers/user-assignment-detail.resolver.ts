import { Injectable } from '@angular/core';
import { UserAssignment } from '../_models/userAssignment';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AssignmentService } from '../_services/assignment.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserAssignmentDetailResolver implements Resolve<UserAssignment> {
    constructor(
        private assignmentService: AssignmentService,
        private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<UserAssignment> {
        let id: number;
        if (route.params['assId']) {
            id = route.params['assId'];
        } else {
            id = route.params['id'];
        }
        return this.assignmentService.getUserAssignment(id).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
