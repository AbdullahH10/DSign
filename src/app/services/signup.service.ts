import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  API_URL: string = "http://localhost:9191";

  constructor(
    private http: HttpClient
  ) { }

  addUser(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/users`,newUser);
  }
}
