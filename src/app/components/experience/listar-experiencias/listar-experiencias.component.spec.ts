import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarExperienciasComponent } from './listar-experiencias.component';

describe('ListarExperienciasComponent', () => {
  let component: ListarExperienciasComponent;
  let fixture: ComponentFixture<ListarExperienciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarExperienciasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarExperienciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
