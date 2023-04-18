import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMenuSlideComponent } from './patient-menu-slide.component';

describe('PatientMenuSlideComponent', () => {
  let component: PatientMenuSlideComponent;
  let fixture: ComponentFixture<PatientMenuSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMenuSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMenuSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
