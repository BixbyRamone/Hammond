import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class StudentListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 10;
    userParams: any = {};

    constructor(private userService: UserService, private router: Router,
            private alertify: AlertifyService) {}

            resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
                this.userParams = this.setUpUserParams();
                const test = typeof(this.userParams.roleName);
                return this.userService.getUsers(this.pageNumber, this.pageSize, this.userParams).pipe(
                    catchError(error => {
                        this.alertify.error('Problem retrieving data');
                        this.router.navigate(['/']);
                        return of(null);
                    })
                );
            }

            setUpUserParams() {
                const url = window.location.href;
                const arr = url.split('/');
                let userParams: any = {};

                if (arr[arr.length - 2] === 'mentor' && arr[arr.length - 1] === 'students') {
                    userParams = {
                        roleName: 'student',
                        studentLevel: JSON.parse(localStorage.getItem('user')).studentLevel
                    };
                } if (arr[arr.length - 1] === 'mentor') {
                    userParams = {
                        roleName: 'mentor',
                        studentLevel: JSON.parse(localStorage.getItem('user')).studentLevel
                    }
                } else {
                    userParams = {
                        roleName: 'student',
                        studentLevel: 'all'
                    };
                }

                return userParams;
              }
}
