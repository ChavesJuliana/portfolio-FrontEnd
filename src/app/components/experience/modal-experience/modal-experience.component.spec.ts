import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExperienceComponent } from './modal-experience.component';

describe('ModalExperienceComponent', () => {
  let component: ModalExperienceComponent;
  let fixture: ComponentFixture<ModalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExperienceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
