import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogin } from './add-login';

describe('AddLogin', () => {
  let component: AddLogin;
  let fixture: ComponentFixture<AddLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
