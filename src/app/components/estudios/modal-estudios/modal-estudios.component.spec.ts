import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstudiosComponent } from './modal-estudios.component';

describe('ModalEstudiosComponent', () => {
  let component: ModalEstudiosComponent;
  let fixture: ComponentFixture<ModalEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEstudiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
