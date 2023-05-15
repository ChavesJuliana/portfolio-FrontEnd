import { TestBed } from '@angular/core/testing';

import { TipoTrabajoService } from './service-tipo-trabajo.service';

describe('ServiceTipoTrabajoService', () => {
  let service: TipoTrabajoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoTrabajoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
