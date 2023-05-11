import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarConocimientosComponent } from './listar-conocimientos.component';

describe('ListarConocimientosComponent', () => {
  let component: ListarConocimientosComponent;
  let fixture: ComponentFixture<ListarConocimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarConocimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarConocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
