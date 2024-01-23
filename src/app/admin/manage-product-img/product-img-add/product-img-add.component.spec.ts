import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImgAddComponent } from './product-img-add.component';

describe('ProductImgAddComponent', () => {
  let component: ProductImgAddComponent;
  let fixture: ComponentFixture<ProductImgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductImgAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductImgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
