import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupplierEditComponent } from './manage-supplier-edit.component';

describe('ManageSupplierEditComponent', () => {
  let component: ManageSupplierEditComponent;
  let fixture: ComponentFixture<ManageSupplierEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSupplierEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupplierEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
