import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuserComponent } from './tuser.component';

describe('TuserComponent', () => {
  let component: TuserComponent;
  let fixture: ComponentFixture<TuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
