import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@app/http/users.service';

import { UserExtrasTabComponent } from './user-extras-tab.component';

describe('UserExtrasTabComponent', () => {
  let component: UserExtrasTabComponent;
  let fixture: ComponentFixture<UserExtrasTabComponent>;
  let service: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserExtrasTabComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserExtrasTabComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
