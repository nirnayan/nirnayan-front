import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogViewSliderComponent } from './blog-view-slider.component';

describe('BlogViewSliderComponent', () => {
  let component: BlogViewSliderComponent;
  let fixture: ComponentFixture<BlogViewSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogViewSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogViewSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
