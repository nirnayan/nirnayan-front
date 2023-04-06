import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderslideComponent } from './headerslide.component';

describe('HeaderslideComponent', () => {
  let component: HeaderslideComponent;
  let fixture: ComponentFixture<HeaderslideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderslideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderslideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
