import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimazeProfileComponent } from './minimaze-profile.component';

describe('MinimazeProfileComponent', () => {
  let component: MinimazeProfileComponent;
  let fixture: ComponentFixture<MinimazeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimazeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimazeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
