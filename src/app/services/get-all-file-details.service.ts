import { fileDetail } from './../../models/fileDetail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GetAllFileDetailsService {

  API_URL: string = "http://localhost:9191";

  constructor(private http: HttpClient) { }

  getAllFileDetails(): Observable<fileDetail[]> {
    return this.http.get<fileDetail[]>(`${this.API_URL}/image/fileSystem/`);
  }
}
