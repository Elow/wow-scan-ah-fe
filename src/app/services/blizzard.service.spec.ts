import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BlizzardService } from './blizzard.service';

describe('BlizzardService', () => {
  let service: BlizzardService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [BlizzardService] });
    service = TestBed.inject(BlizzardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
