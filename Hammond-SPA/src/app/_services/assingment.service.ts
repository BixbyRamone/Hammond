import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Assignment } from '../_models/assignment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssingmentService {
  baseUrl = environment.apiUrl + 'assignments/';
  // currentUser: User;
  assignment: Assignment;

constructor(private http: HttpClient) { }

register(id: number, assignment: Assignment) {
  // assignment.createdBy = currentUser;
  return this.http.post(this.baseUrl + id, assignment);
}

}
