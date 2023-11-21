import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClassDetailsPage } from './class-details.page';

describe('ClassDetailsPage', () => {
  let component: ClassDetailsPage;
  let fixture: ComponentFixture<ClassDetailsPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ClassDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
