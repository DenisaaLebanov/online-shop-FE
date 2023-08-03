import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/modules/shared/types/cart.types';
import { ProductDetails } from 'src/app/modules/shared/types/product.types';
import { ShoppingCart } from 'src/app/modules/shared/types/shopping-cart.types';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss'],
})
export class ProductsListViewComponent {
  @Input() products?: Observable<ProductDetails[]>;
  @Input() cartItems!: CartItem[];
  @Output() shoppingCartItems?: Observable<ShoppingCart[]>;

  displayedColumns: string[] = ['name', 'price', 'description', 'category'];

  constructor(private cartService: CartService) {}

  getShoppingCartItems() {
    this.shoppingCartItems = this.cartService.getShoppingCartItems();
    console.log(this.shoppingCartItems);
    return this.shoppingCartItems;
  }
}
