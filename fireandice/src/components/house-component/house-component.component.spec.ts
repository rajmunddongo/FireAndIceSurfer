import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseComponentComponent } from './house-component.component';

describe('HouseComponentComponent', () => {
  let component: HouseComponentComponent;
  let fixture: ComponentFixture<HouseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
