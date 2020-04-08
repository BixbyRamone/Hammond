import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assignment } from '../_models/assignment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Session } from '../_models/session';
import { PaginatedResult } from '../_models/pagination';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = environment.apiUrl + 'sessions/';
  assignment: Assignment;
  session: Session;

constructor(private http: HttpClient,
            private router: Router) { }

register(userId: number, session: Session) {
  return this.http.post(this.baseUrl + userId, session);
}

getSessions(sessionParams?) {
  // let result: Session[];
  const paginatedResult: PaginatedResult<Session[]> = new PaginatedResult<Session[]>();
  let params = new HttpParams;
  if (sessionParams) {
    if (sessionParams.studentLevel !== 'all') {
      params = params.append('studentLevel', sessionParams.studentLevel);
    }
    if (sessionParams.getNextSession) {
      params = params.append('getNextSession', sessionParams.getNextSession);
    }
  }

  console.log(this.http.get<Session[]>(this.baseUrl, { observe: 'response', params}));

  return this.http.get<Session[]>(this.baseUrl, { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

getNextSession(sessionParams?) {
  debugger
  let params = new HttpParams;

  if (sessionParams.studentLevel !== 'all') {
    params = params.append('studentLevel', sessionParams.studentLevel);
  }
  console.log(this.http.get<Session>(this.baseUrl + 'next', {params}));
  return this.http.get<Session>(this.baseUrl + 'next', {params});
}

}
