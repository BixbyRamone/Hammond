import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assignment } from '../_models/assignment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Session } from '../_models/session';

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
  let result: Session[];
  const params = new HttpParams;

  return this.http.get<Session[]>(this.baseUrl, { observe: 'response', params})
    .pipe(
      map(resoponse => {
        result = resoponse.body;
        return result;
      })
    );
}

}
