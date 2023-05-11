import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConocimientosComponent } from './modal-conocimientos.component';

describe('ModalConocimientosComponent', () => {
  let component: ModalConocimientosComponent;
  let fixture: ComponentFixture<ModalConocimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalConocimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalConocimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
