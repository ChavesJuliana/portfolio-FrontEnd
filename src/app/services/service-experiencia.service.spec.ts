import { TestBed } from '@angular/core/testing';

import { ExperienciaService } from './service-experiencia.service';

describe('ServiceExperienciaService', () => {
  let service: ExperienciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperienciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
