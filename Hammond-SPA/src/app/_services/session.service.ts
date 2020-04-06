import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assignment } from '../_models/assignment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Session } from '../_models/session';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseUrl = environment.apiUrl + 'sessions/';
  assignment: Assignment;
  session: Session;

constructor(private http: HttpClient) { }

register(userId: number, session: Session) {
  return this.http.post(this.baseUrl + userId, session);
}

getSessions(sessionParams?) {
  // let result: Session[];
  const paginatedResult: PaginatedResult<Session[]> = new PaginatedResult<Session[]>();
  const params = new HttpParams;

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

}
