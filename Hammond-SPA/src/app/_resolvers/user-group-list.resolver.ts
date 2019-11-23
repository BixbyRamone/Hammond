import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Group } from '../_models/group';
import { GroupService } from '../_services/group.service';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserGroupListResolver implements Resolve<Group[]> {
    pageNumber = 1;
    pageSize = 10;

    constructor(
        private groupService: GroupService,
        private router: Router,
        private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<Group[]> {
                return this.groupService.getGroups(this.pageNumber, this.pageSize).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
