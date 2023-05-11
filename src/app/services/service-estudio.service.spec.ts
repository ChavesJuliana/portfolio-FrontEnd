import { TestBed } from '@angular/core/testing';

import { ServiceEstudioService } from './service-estudio.service';

describe('ServiceEstudioService', () => {
  let service: ServiceEstudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEstudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
