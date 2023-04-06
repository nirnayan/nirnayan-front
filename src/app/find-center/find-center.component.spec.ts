import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCenterComponent } from './find-center.component';

describe('FindCenterComponent', () => {
  let component: FindCenterComponent;
  let fixture: ComponentFixture<FindCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
