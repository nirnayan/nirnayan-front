import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartSliderComponent } from './depart-slider.component';

describe('DepartSliderComponent', () => {
  let component: DepartSliderComponent;
  let fixture: ComponentFixture<DepartSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
