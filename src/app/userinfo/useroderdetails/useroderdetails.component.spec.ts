import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseroderdetailsComponent } from './useroderdetails.component';

describe('UseroderdetailsComponent', () => {
  let component: UseroderdetailsComponent;
  let fixture: ComponentFixture<UseroderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseroderdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseroderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
