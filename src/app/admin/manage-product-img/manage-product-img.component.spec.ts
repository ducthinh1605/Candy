import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductImgComponent } from './manage-product-img.component';

describe('ManageProductImgComponent', () => {
  let component: ManageProductImgComponent;
  let fixture: ComponentFixture<ManageProductImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProductImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
