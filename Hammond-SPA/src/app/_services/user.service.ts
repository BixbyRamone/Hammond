import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';
import { Assignment } from '../_models/assignment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
  let params = new HttpParams();

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null) {
    params = params.append('studentLevel', userParams.studentLevel);
    params =  params.append('roleName', userParams.roleName);
  } else {
    params = params.append('studentLevel', this.getStudentLevel()); // why is this here!?
  }
  if (userParams.getUngrouped === true) {
    params = params.append('getUngrouped', userParams.getUngrouped);
  }

  if (userParams.groupId !=  null) {
    params = params.append('groupId', userParams.groupId);
  }

  return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params})
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

getUngroupedUsers(userParams?): Observable<User[]> {
  let params = new HttpParams();

  params = params.append('getUngrouped', userParams.getUngrouped);

  return this.http.get<User[]>(this.baseUrl + 'users', {params});
}

getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseUrl + 'users/' + id, user);
}

updateUserRoles(id: number, user: User, newRoles: any) {
  if (newRoles) {
    user.userRoles = newRoles;
  }
  return this.http.put(this.baseUrl + 'users/roles/' + id, user);
}

updateUserActScores(id: number, user: User, actForm: any) {
  user.actScores = [];
  user.actScores.push(actForm.value);
  return this.http.put(this.baseUrl + 'users/actscores/' + id, user);
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if (page != null && itemsPerPage != null) {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
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

deleteUser(userId: number, id: number) {
  return this.http.delete(this.baseUrl + 'users/' + id + '/authId/' + userId);
}

createAssignment(id: number, assignment: Assignment) {
  return this.http.post(this.baseUrl + 'assignments/' + id, assignment);
}

getMessageThread(id: number, recipientId: number) {
  return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
}

sendMessage(id: number, message: Message) {
  return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
}

deleteMessage(id: number, userId: number) {
  return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
}

markAsRead(userId: number, messageId: number) {
  this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
    .subscribe();
}

getStudentLevel() {
  let info = JSON.parse(localStorage.getItem('user'));
  info = info.studentLevel;
  return info;
}
}
