import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PricecomComponent } from './pricecom/pricecom.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { SingleComponent } from './single/single.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ManageUserEditComponent } from './admin/manage-users/manage-user-edit/manage-user-edit.component';
import { ManageUserAddComponent } from './admin/manage-users/manage-user-add/manage-user-add.component';
import { AdminGuard } from './admin.guard';
import { LoginGuard } from './login.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DialogflowChatComponent } from './dialogflow-chat/dialogflow-chat.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { UsereditComponent } from './userinfo/useredit/useredit.component';
import { BreakingnewsComponent } from './breakingnews/breakingnews.component';
import { TestfrontComponent } from './testfront/testfront.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', component: TestfrontComponent},
  {path: 'chat',component:DialogflowChatComponent},
  {path: 'contact',component:ContactComponent},
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'news', component: NewsComponent},
  {path: 'adminlogin', component: AdminLoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'products', component: ProductsComponent},
  { path: 'shop/:id', component: ShopComponent },
  {path: 'pricecom', component: PricecomComponent},
  {path: 'single', component: SingleComponent},
  {path: 'thankyou', component: ThankyouComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent},
  {path: 'user', component: UserinfoComponent},
  {path: 'edit', component: UsereditComponent},
  {path: 'home/products', component: ProductsComponent},
  {path: 'home/products/:category', component: ProductsComponent},
  {path: 'admin', canActivate: [AdminGuard], children: [
    {path: '', component: DashboardComponent},
    {path: 'edit/:id', component: ManageUserEditComponent},
    {path: 'add', component: ManageUserAddComponent}
  ]},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
