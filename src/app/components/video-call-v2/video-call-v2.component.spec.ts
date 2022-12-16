import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoCallV2Component } from './video-call-v2.component';

describe('VideoCallV2Component', () => {
  let component: VideoCallV2Component;
  let fixture: ComponentFixture<VideoCallV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoCallV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoCallV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
