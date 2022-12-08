import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  API_URL: string = "http://localhost:9191";

  constructor(
    private http: HttpClient
  ) { }

  updateUser(userInfo: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/users`,userInfo);
  }
}
