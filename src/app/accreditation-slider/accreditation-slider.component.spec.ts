import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationSliderComponent } from './accreditation-slider.component';

describe('AccreditationSliderComponent', () => {
  let component: AccreditationSliderComponent;
  let fixture: ComponentFixture<AccreditationSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditationSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
