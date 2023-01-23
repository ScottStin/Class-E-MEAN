import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamUserDialogComponent } from './exam-user-dialog.component';

describe('ExamUserDialogComponent', () => {
  let component: ExamUserDialogComponent;
  let fixture: ComponentFixture<ExamUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
