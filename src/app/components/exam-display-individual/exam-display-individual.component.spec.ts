import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDisplayIndividualComponent } from './exam-display-individual.component';

describe('ExamDisplayIndividualComponent', () => {
  let component: ExamDisplayIndividualComponent;
  let fixture: ComponentFixture<ExamDisplayIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamDisplayIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamDisplayIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
