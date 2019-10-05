import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupToCreate } from '../_models/groupToCreate';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiUrl + 'groups/';
  group: GroupToCreate;

constructor(private http: HttpClient) { }

register(group: GroupToCreate) {
  return this.http.post(this.baseUrl, group);
}

getGroups(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<Group[]>> {
  const paginatedResult: PaginatedResult<Group[]> = new PaginatedResult<Group[]>();

  let params = new HttpParams();

  if (userParams != null) {
    params = params.append('studentLevel', userParams.studentLevel);
  }

  return this.http.get<Group[]>(this.baseUrl, { observe: 'response', params})
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
