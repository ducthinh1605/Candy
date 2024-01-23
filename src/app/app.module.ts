import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';
import { ShopComponent } from './shop/shop.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MatIconModule} from '@angular/material/icon';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, TitleCasePipe  } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ManageUserEditComponent } from './admin/manage-users/manage-user-edit/manage-user-edit.component';
import { ManageUserAddComponent } from './admin/manage-users/manage-user-add/manage-user-add.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import { ManageProductsAddNewComponent } from './admin/manage-products/manage-products-add-new/manage-products-add-new.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { ManageProductsEditComponent } from './admin/manage-products/manage-products-edit/manage-products-edit.component';
import { ManageCategoriesAddNewComponent } from './admin/manage-categories/manage-categories-add-new/manage-categories-add-new.component';
import { ManageCategoriesEditComponent } from './admin/manage-categories/manage-categories-edit/manage-categories-edit.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './loading/loading.component';
import { DatePipe } from '@angular/common';
import { ManageSupplierComponent } from './admin/manage-supplier/manage-supplier.component';
import { ManageSupplierEditComponent } from './admin/manage-supplier/manage-supplier-edit/manage-supplier-edit.component';
import { ManageSupplierAddNewComponent } from './admin/manage-supplier/manage-supplier-add-new/manage-supplier-add-new.component';
import { ManageProductImgComponent } from './admin/manage-product-img/manage-product-img.component';
import { UcWidgetModule } from 'ngx-uploadcare-widget';
import { ProductImgAddComponent } from './admin/manage-product-img/product-img-add/product-img-add.component';
import { ProduccImgUpdateComponent } from './admin/manage-product-img/producc-img-update/producc-img-update.component';
import { CartComponent } from './cart/cart.component';
import { ManageOrderComponent } from './admin/manage-order/manage-order.component';
import { ManageOrderDetailComponent } from './admin/manage-order/manage-order-detail/manage-order-detail.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {MatCardModule} from '@angular/material/card';
import { DialogflowChatComponent } from './dialogflow-chat/dialogflow-chat.component';
import { UseroderdetailsComponent } from './userinfo/useroderdetails/useroderdetails.component';
import { ManageNewsComponent } from './admin/manage-news/manage-news.component';
import { NewsAddComponent } from './admin/manage-news/news-add/news-add.component';
import { NeweditComponent } from './admin/manage-news/newedit/newedit.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { UsereditComponent } from './userinfo/useredit/useredit.component';
import { ManageContactComponent } from './admin/manage-contact/manage-contact.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BreakingnewsComponent } from './breakingnews/breakingnews.component';
import { OrderhistoryComponent } from './userinfo/orderhistory/orderhistory.component';
import { StatisticalComponent } from './admin/statistical/statistical.component';
import { ConfirmComponent } from './register/confirm/confirm.component';
import { TestfrontComponent } from './testfront/testfront.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PricecomComponent,
    HomeComponent,
    SingleComponent,
    ShopComponent,
    CheckoutComponent,
    ThankyouComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CategoryComponent,
    DashboardComponent,
    ManageUsersComponent,
    ManageCategoriesComponent,
    ManageProductsComponent,
    ManageUserEditComponent,
    ManageUserAddComponent,
    ManageProductsAddNewComponent,
    ImageViewComponent,
    ManageProductsEditComponent,
    ManageCategoriesAddNewComponent,
    ManageCategoriesEditComponent,
    ConfirmDialogComponent,
    LoadingComponent,
    ManageSupplierComponent,
    ManageSupplierEditComponent,
    ManageSupplierAddNewComponent,
    ManageProductImgComponent,
    ProductImgAddComponent,
    ProduccImgUpdateComponent,
    CartComponent,
    ManageOrderComponent,
    ManageOrderDetailComponent,
    UserinfoComponent,
    AdminLoginComponent,
    DialogflowChatComponent,
    UseroderdetailsComponent,
    ManageNewsComponent,
    NewsAddComponent,
    NeweditComponent,
    NewsComponent,
    ContactComponent,
    UsereditComponent,
    ManageContactComponent,
    BreakingnewsComponent,
    OrderhistoryComponent,
    StatisticalComponent,
    ConfirmComponent,
    TestfrontComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    UcWidgetModule,
    MatCardModule,
    MatSlideToggleModule,
    
  ],
  entryComponents: [ManageUserAddComponent],
  providers: [TitleCasePipe,DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
