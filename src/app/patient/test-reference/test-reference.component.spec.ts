import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReferenceComponent } from './test-reference.component';

describe('TestReferenceComponent', () => {
  let component: TestReferenceComponent;
  let fixture: ComponentFixture<TestReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
