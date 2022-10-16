import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user.model';
import { userVerification } from 'src/models/userVerification.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  API_URL: string = "http://localhost:9191";

  constructor(
    private http: HttpClient
  ) { }

  getUser(userid: number): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/user/${userid}`);
  }

  verifyUser(userVerification: userVerification): Observable<User> {
    return this.http.post<User>(`${this.API_URL}/login`,userVerification);
  }
}
