import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploresComponent } from './explores.component';

describe('ExploresComponent', () => {
  let component: ExploresComponent;
  let fixture: ComponentFixture<ExploresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExploresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
