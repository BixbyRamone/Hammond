import { Injectable } from '@angular/core';
import { Group } from '../_models/group';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';
import { GroupService } from '../_services/group.service';

@Injectable()
export class GroupResolver implements Resolve<Group> {
    constructor(private groupService: GroupService, private authService: AuthService,
        private router: Router, private alertify: AlertifyService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<Group> {
            return this.groupService.getGroup(JSON.parse(localStorage.getItem('user')).userGroups[0].groupId).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving your data');
                    this.router.navigate(['/']);
                    return of(null);
                })
            );
        }
}
