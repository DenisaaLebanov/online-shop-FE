import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/containers/products-list/products-list.component';
import { ShoppingCartComponent } from './components/containers/shopping-cart/shopping-cart.component';
import { ProductsDetailsComponent } from './components/containers/products-details/products-details.component';

const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent,
  },
  {
    path: 'products/:id',
    component: ProductsDetailsComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
