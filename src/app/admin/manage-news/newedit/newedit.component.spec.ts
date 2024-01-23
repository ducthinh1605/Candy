import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeweditComponent } from './newedit.component';

describe('NeweditComponent', () => {
  let component: NeweditComponent;
  let fixture: ComponentFixture<NeweditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeweditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeweditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
