import { TestBed } from '@angular/core/testing';

import { ServiceProyectoService } from './service-proyecto.service';

describe('ServiceProyectoService', () => {
  let service: ServiceProyectoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceProyectoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
