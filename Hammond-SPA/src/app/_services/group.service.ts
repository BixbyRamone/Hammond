import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Group } from '../_models/group';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseUrl = environment.apiUrl + 'groups/';
  group: Group;

constructor(private http: HttpClient) { }

register(group: Group) {
  return this.http.post(this.baseUrl, group);
}

}
