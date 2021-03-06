import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Evnt } from '../_models/event';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  baseUrl = environment.apiUrl + 'events/';
  evnt: Evnt;

constructor(private http: HttpClient) { }

register(id: number, evnt: Evnt) {
  return this.http.post(this.baseUrl + id, evnt);
}

getEvents(page?, itemsPerPage?): Observable<PaginatedResult<Evnt[]>> {
  const paginatedResult: PaginatedResult<Evnt[]> = new PaginatedResult<Evnt[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Evnt[]>(this.baseUrl, { observe: 'response', params})
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

getEvent(id): Observable<Evnt> {
  return this.http.get<Evnt>(this.baseUrl + id);
}

deleteEvent(authId: number, id: number) {
  return this.http.delete(this.baseUrl + id + '/authId/' + authId);
}

updateEvent(id: number, event: Evnt) {
  return this.http.put(this.baseUrl + id, event);
}

}
