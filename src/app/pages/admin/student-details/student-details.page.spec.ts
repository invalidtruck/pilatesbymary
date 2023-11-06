import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { StudentDetailsPage } from './student-details.page';

describe('StudentDetailsPage', () => {
  let component: StudentDetailsPage;
  let fixture: ComponentFixture<StudentDetailsPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(StudentDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
