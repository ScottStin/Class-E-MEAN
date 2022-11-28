import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsShowComponent } from './exams-show.component';

describe('ExamsShowComponent', () => {
  let component: ExamsShowComponent;
  let fixture: ComponentFixture<ExamsShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
