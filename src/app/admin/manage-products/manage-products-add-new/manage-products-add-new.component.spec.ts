import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsAddNewComponent } from './manage-products-add-new.component';

describe('ManageProductsAddNewComponent', () => {
  let component: ManageProductsAddNewComponent;
  let fixture: ComponentFixture<ManageProductsAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductsAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductsAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
