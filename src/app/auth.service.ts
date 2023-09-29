import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { baseUrl } from './environment';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './model/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get getcurrentUser() {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
    return this.currentUserSubject.value;
  }

  validate(): Observable<any> {
    return this.http.get(`${baseUrl}users/validate`);
  }

  login(data:string): Observable<LoginResponse> {
    
    return this.http.post<LoginResponse>(`${baseUrl}users/login/`, data)
      .pipe(map(results => {
        if (results.success) {
          localStorage.setItem('currentUser', JSON.stringify(results.currentUser))
        };
        return results;
      }));
  }


  signup(data:string): Observable<any> {
    return this.http.post(`${baseUrl}users/signup`, data);
  }

  // Error Functions
  handleError(error: any, from = undefined) {
    console.error(`An Error Occurred from : ${from} :: `, error);
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}


