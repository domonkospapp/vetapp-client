import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUsername')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
      return this.http.post<any>('http://localhost:8080/api/auth/signin', { username, password })
          .pipe(map(res => {
              // login successful if there's a jwt token in the response
              if (res && res.accessToken) {
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUsername', JSON.stringify(username));
                  localStorage.setItem('currentUserToken', JSON.stringify(res.accessToken));
                  this.currentUserSubject.next(username);
              }
              return username;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUserToken');
      localStorage.removeItem('currentUsername');
      this.currentUserSubject.next(null);
  }
}
