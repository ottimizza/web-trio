import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BelvoConnectionComponent } from './belvo-connection.component';

describe('BelvoConnectionComponent', () => {
  let component: BelvoConnectionComponent;
  let fixture: ComponentFixture<BelvoConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BelvoConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BelvoConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
