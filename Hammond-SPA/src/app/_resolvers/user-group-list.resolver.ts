import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserGroupListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 20;
    userParams: any = {};

    constructor(private userService: UserService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
                this.userParams.getUngrouped = true;
                return this.userService.getUsers(null, null, this.userParams).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
