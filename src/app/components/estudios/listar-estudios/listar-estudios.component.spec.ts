import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstudiosComponent } from './listar-estudios.component';

describe('ListarEstudiosComponent', () => {
  let component: ListarEstudiosComponent;
  let fixture: ComponentFixture<ListarEstudiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstudiosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstudiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
