import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClassPage } from './class.page';

describe('ClassPage', () => {
  let component: ClassPage;
  let fixture: ComponentFixture<ClassPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(ClassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
