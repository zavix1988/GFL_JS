import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component'
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
   {path: '', component: HomeComponent},
   {path: 'list', component: ListComponent},
   {path: 'shop', component:ShopComponent},
   {path: 'orders', component:OrdersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
