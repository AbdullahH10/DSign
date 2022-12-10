import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  API_URL: string = "http://localhost:9191";

  constructor(private http: HttpClient) { }

  downloadFile(fileName: string) {
    return this.http.get(`${this.API_URL}/image/fileSystem/${fileName}`);
  }
}
