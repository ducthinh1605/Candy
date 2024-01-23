import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCategoriesAddNewComponent } from './manage-categories-add-new.component';

describe('ManageCategoriesAddNewComponent', () => {
  let component: ManageCategoriesAddNewComponent;
  let fixture: ComponentFixture<ManageCategoriesAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageCategoriesAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCategoriesAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
