import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserEditComponent } from './manage-user-edit.component';

describe('ManageUserEditComponent', () => {
  let component: ManageUserEditComponent;
  let fixture: ComponentFixture<ManageUserEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
