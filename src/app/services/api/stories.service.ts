import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Story } from 'src/app/models/stories/story.model';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private API_URL = '/api/stories';

  constructor(private http: HttpClient) {}

  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.API_URL);
  }
}
