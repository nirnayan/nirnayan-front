import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccreditationnComponent } from './accreditationn.component';

describe('AccreditationnComponent', () => {
  let component: AccreditationnComponent;
  let fixture: ComponentFixture<AccreditationnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccreditationnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccreditationnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
