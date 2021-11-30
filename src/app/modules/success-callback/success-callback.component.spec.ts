import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessCallbackComponent } from './success-callback.component';

describe('SuccessCallbackComponent', () => {
  let component: SuccessCallbackComponent;
  let fixture: ComponentFixture<SuccessCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessCallbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
