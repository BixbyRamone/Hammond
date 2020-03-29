import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Assignment } from '../_models/assignment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';

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

updateAssignment(id: number, assignment: Assignment) {
  return this.http.put(this.baseUrl + id, assignment);
}

getAssignments(page?, itemsPerPage?, assignmentParams?): Observable<PaginatedResult<Assignment[]>> {
  const paginatedResult: PaginatedResult<Assignment[]> = new PaginatedResult<Assignment[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (assignmentParams != null) {
    params = params.append('studentLevel', assignmentParams.studentLevel);
    // params =  params.append('roleName', assignmentParams.roleName);
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

getAssignment(id): Observable<Assignment> {
  return this.http.get<Assignment>(this.baseUrl + id);
}

getAssignmentMessages(userId, assignmentId): Observable<Message[]> {
  return this.http.get<Message[]>(environment.apiUrl + 'users/' + userId + '/messages/assignment/' + assignmentId);
}

deleteAssignment(userId: number, id: number) {
  return this.http.delete(this.baseUrl + id + '/authId/' + userId);
}

}
