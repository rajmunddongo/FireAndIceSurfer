import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHouseComponent } from './display-house.component';

describe('DisplayHouseComponent', () => {
  let component: DisplayHouseComponent;
  let fixture: ComponentFixture<DisplayHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHouseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
