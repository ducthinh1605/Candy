import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestfrontComponent } from './testfront.component';

describe('TestfrontComponent', () => {
  let component: TestfrontComponent;
  let fixture: ComponentFixture<TestfrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestfrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestfrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
