import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AaSliderComponent } from './aa-slider.component';

describe('AaSliderComponent', () => {
  let component: AaSliderComponent;
  let fixture: ComponentFixture<AaSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AaSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
