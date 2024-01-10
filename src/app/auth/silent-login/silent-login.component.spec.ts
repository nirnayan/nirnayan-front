import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilentLoginComponent } from './silent-login.component';

describe('SilentLoginComponent', () => {
  let component: SilentLoginComponent;
  let fixture: ComponentFixture<SilentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilentLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SilentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
