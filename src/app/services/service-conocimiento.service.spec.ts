import { TestBed } from '@angular/core/testing';

import { ServiceConocimientoService } from './service-conocimiento.service';

describe('ServiceConocimientoService', () => {
  let service: ServiceConocimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConocimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
