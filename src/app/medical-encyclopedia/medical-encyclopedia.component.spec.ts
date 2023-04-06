import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalEncyclopediaComponent } from './medical-encyclopedia.component';

describe('MedicalEncyclopediaComponent', () => {
  let component: MedicalEncyclopediaComponent;
  let fixture: ComponentFixture<MedicalEncyclopediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalEncyclopediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalEncyclopediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
