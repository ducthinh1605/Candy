import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserAddComponent } from './manage-user-add.component';

describe('ManageUserAddComponent', () => {
  let component: ManageUserAddComponent;
  let fixture: ComponentFixture<ManageUserAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUserAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageUserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
