import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloggrSliderComponent } from './bloggr-slider.component';

describe('BloggrSliderComponent', () => {
  let component: BloggrSliderComponent;
  let fixture: ComponentFixture<BloggrSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BloggrSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloggrSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
