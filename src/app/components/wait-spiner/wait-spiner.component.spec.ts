import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitSpinerComponent } from './wait-spiner.component';

describe('WaitSpinerComponent', () => {
  let component: WaitSpinerComponent;
  let fixture: ComponentFixture<WaitSpinerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitSpinerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitSpinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
