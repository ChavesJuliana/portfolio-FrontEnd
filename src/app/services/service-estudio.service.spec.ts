import { TestBed } from '@angular/core/testing';

import { EstudioService } from './service-estudio.service';

describe('ServiceEstudioService', () => {
  let service: EstudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
