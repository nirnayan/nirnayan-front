import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSliderrComponent } from './blog-sliderr.component';

describe('BlogSliderrComponent', () => {
  let component: BlogSliderrComponent;
  let fixture: ComponentFixture<BlogSliderrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSliderrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSliderrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
