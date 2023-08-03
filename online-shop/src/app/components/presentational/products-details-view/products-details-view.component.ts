import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/modules/shared/types/cart.types';
import { ProductDetails } from 'src/app/modules/shared/types/product.types';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-details-view',
  templateUrl: './products-details-view.component.html',
  styleUrls: ['./products-details-view.component.scss'],
})
export class ProductsDetailsViewComponent {
  @Input() productDetail?: ProductDetails;

  constructor(private cartService: CartService) {}

  addToCartProductDetail(productDetail: ProductDetails) {
    if (productDetail) {
      this.cartService.addToCart(productDetail);
    }
  }

  deleteProductFromList(productDetail: ProductDetails) {
    if (productDetail) {
      this.cartService.deleteProductFromList(productDetail);
    }
  }
}
