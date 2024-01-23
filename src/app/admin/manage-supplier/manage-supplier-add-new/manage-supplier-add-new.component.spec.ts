import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSupplierAddNewComponent } from './manage-supplier-add-new.component';

describe('ManageSupplierAddNewComponent', () => {
  let component: ManageSupplierAddNewComponent;
  let fixture: ComponentFixture<ManageSupplierAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSupplierAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSupplierAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
