import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUsername: string;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
      return this.http.post<any>('http://localhost:8080/api/auth/signin', { username, password })
          .pipe(map(res => {
              // login successful if there's a jwt token in the response
              if (res && res.accessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUsername', JSON.stringify(username));
                  localStorage.setItem('currentUserToken', JSON.stringify(res.accessToken));
                  this.currentUsername = username;
              }
              return username;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUserToken');
      localStorage.removeItem('currentUsername');
      this.currentUsername = null;
  }
}
