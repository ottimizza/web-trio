import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PulsatingSpinnerComponent } from './pulsating-spinner.component';

describe('PulsatingSpinnerComponent', () => {
  let component: PulsatingSpinnerComponent;
  let fixture: ComponentFixture<PulsatingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PulsatingSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PulsatingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
