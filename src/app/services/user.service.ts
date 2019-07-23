import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: string;

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<User> {
    const token = JSON.parse(localStorage.getItem('currentUserToken'));
    const headers = new HttpHeaders({Authorization : 'Bearer ' + token});
    return this.http.get<User>('http://localhost:8080/users/' + username, {headers});
  }

}
