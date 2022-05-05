import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledCallbackComponent } from './cancelled-callback.component';

describe('CancelledCallbackComponent', () => {
  let component: CancelledCallbackComponent;
  let fixture: ComponentFixture<CancelledCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
