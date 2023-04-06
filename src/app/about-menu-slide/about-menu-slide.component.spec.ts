import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMenuSlideComponent } from './about-menu-slide.component';

describe('AboutMenuSlideComponent', () => {
  let component: AboutMenuSlideComponent;
  let fixture: ComponentFixture<AboutMenuSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutMenuSlideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutMenuSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
