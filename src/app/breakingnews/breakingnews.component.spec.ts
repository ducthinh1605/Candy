import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakingnewsComponent } from './breakingnews.component';

describe('BreakingnewsComponent', () => {
  let component: BreakingnewsComponent;
  let fixture: ComponentFixture<BreakingnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BreakingnewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakingnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
