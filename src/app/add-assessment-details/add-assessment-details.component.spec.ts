import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAssessmentDetailsComponent } from './add-assessment-details.component';

describe('AddAssessmentDetailsComponent', () => {
  let component: AddAssessmentDetailsComponent;
  let fixture: ComponentFixture<AddAssessmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAssessmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
