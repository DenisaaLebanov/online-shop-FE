import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from 'src/app/modules/shared/types/product.types';
import { ShoppingCart } from 'src/app/modules/shared/types/shopping-cart.types';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart-view',
  templateUrl: './shopping-cart-view.component.html',
  styleUrls: ['./shopping-cart-view.component.scss'],
})
export class ShoppingCartViewComponent {
  shoppingCartItems?: Observable<ShoppingCart[]>;
  constructor(private cartService: CartService) {}

  ngOnInit() {
    return this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    this.shoppingCartItems = this.cartService.getShoppingCartItems();
    console.log(this.shoppingCartItems);
    return this.shoppingCartItems;
  }

  // TO DO: delete from shopping cart
  // deleteFromCart(shoppingCartItem: ShoppingCart) {
  //   if (shoppingCartItem) {
  //     this.cartService.deleteFromCart(shoppingCartItem);
  //   }
  // }
}
