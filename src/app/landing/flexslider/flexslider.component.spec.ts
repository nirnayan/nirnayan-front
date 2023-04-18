import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexsliderComponent } from './flexslider.component';

describe('FlexsliderComponent', () => {
  let component: FlexsliderComponent;
  let fixture: ComponentFixture<FlexsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexsliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlexsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
