import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GroupToCreate } from '../_models/groupToCreate';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_models/pagination';
import { Observable } from 'rxjs';
import { Group } from '../_models/group';
import { map } from 'rxjs/operators';
import { UserGroup } from '../_models/usergroup';
import { Identifiers } from '@angular/compiler';

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

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams) {
    params = params.append('studentLevel', userParams.studentLevel);
    // params = params.append('groupId', userParams.groupId);
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

getGroup(id): Observable<UserGroup> {
  return this.http.get<UserGroup>(this.baseUrl + id);
}

removeUserFromGroup(id: number, userId: number) {
  return this.http.delete(this.baseUrl + 'user/' + id + '/authId/' + userId);
}

disbandGroup(groupId: number, userId: number) {
  return this.http.delete(this.baseUrl + groupId + '/authId/' + userId);
}

}
