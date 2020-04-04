import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Assignment } from '../_models/assignment';
import { AssignmentService } from '../_services/assignment.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AssignmentForSessionResolver implements Resolve<Assignment[]> {
    pageNumber = 1;
    pageSize = 20;
    userParams: any = {};

    constructor(private assignmentService: AssignmentService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<Assignment[]> {
                    this.userParams.studentLevel = 'Sophomore';
                return this.assignmentService.getAssignments(this.pageNumber, this.pageSize, this.userParams).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }

}
