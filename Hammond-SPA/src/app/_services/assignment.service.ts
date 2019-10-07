import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Assignment } from '../_models/assignment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl = environment.apiUrl + 'assignments/';
  assignment: Assignment;

constructor(private http: HttpClient) { }

register(id: number, assignment: Assignment) {
  return this.http.post(this.baseUrl + id, assignment);
}

getAssignments(page?, itemsPerPage?): Observable<PaginatedResult<Assignment[]>> {
  const paginatedResult: PaginatedResult<Assignment[]> = new PaginatedResult<Assignment[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Assignment[]>(this.baseUrl, { observe: 'response', params})
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
