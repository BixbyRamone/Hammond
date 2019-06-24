import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Role } from '../_models/role';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseUrl = environment.apiUrl + 'roles/';
  role: Role;

constructor(private http: HttpClient) { }

public getRoles(): Observable<Role[]> {
  console.log(this.baseUrl);
  return this.http.get<Role[]>(this.baseUrl);
}

}
