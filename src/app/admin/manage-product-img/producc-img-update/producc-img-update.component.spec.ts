import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduccImgUpdateComponent } from './producc-img-update.component';

describe('ProduccImgUpdateComponent', () => {
  let component: ProduccImgUpdateComponent;
  let fixture: ComponentFixture<ProduccImgUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduccImgUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduccImgUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
