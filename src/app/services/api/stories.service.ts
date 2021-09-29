import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StoriesService {
  private API_URL = '/api';

  constructor(private http: HttpClient) {}

  getRandomStory() {
    return this.http.get(this.API_URL + '/stories/random', { responseType: 'text' });
  }
}
