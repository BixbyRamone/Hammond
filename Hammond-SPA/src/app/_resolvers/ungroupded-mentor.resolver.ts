import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UngroupedMentorResolver implements Resolve<User[]> {
    pageNumber = null;
    pageSize = 60;
    userParams: any = {};

    constructor(private userService: UserService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
                this.userParams.getUngrouped = true;
                this.userParams.roleName = 'mentor';
                if (!this.userParams.studentLevel) {
                    this.userParams.studentLevel = 'sophomore';
                }
                return this.userService.getUngroupedUsers(this.userParams, this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
