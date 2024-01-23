import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { Catagory } from '../model/Catagory.model';
import { Supplier } from '../model/Supplier.model';
import { SupplierService } from '../service/supplier.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Output() clickCategoryEvent = new EventEmitter<string>();
  @Output() clickSupplierEvent = new EventEmitter<string>();
  isCategoryVisible: boolean = true;
  isSupplierVisible: boolean = true;
  dataCate: Catagory[]=[];
  dataSup: Supplier[]=[];
  constructor(
    private categoryList: CategoryService,
    private supplierList: SupplierService,
    private router: Router
  ){ }

  
  ngOnInit(): void {
    this.getCatagory();
    this.getSupplier();
  }
  
  
  toggleSection(section: string) {
    if (section === 'categories') {
      this.isCategoryVisible = !this.isCategoryVisible;
    } else if (section === 'suppliers') {
      this.isSupplierVisible = !this.isSupplierVisible;
    }
  }

  getCatagory() {
   this.categoryList.getCategoryList()
    .subscribe((data: Catagory[]) => {
      this.dataCate = data;
    });
  }
  getSupplier() {
    this.supplierList.getSupList()
     .subscribe((data: Supplier[]) => {
       this.dataSup = data;
     });
   }

  onClickCategory(category: any) {
    this.clickCategoryEvent.emit(category);

    const navigationExtras: NavigationExtras = {
      queryParams: { categoryId: category.id }
    };

    this.router.navigate(['/shop'], navigationExtras);
  }
  onClickSupplier(supplier: any) {
    this.clickSupplierEvent.emit(supplier);

    const navigationExtras: NavigationExtras = {
      queryParams: { supplierId: supplier.id }
    };

    this.router.navigate(['/shop'], navigationExtras);
  }
}
