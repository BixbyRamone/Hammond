import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GroupService } from '../_services/group.service';

@Injectable()
export class UserMyGroupResolver implements Resolve<User[]> {
    pageNumber = null;
    pageSize = null;
    userParams: any = {};
    groupId: number;

    constructor(private groupService: GroupService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
                this.groupId = JSON.parse(localStorage.getItem('user')).userGroups[0].groupId;
                return this.groupService.getGroup(this.groupId).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }
}
