import { CartItem } from '../modules/shared/types/cart.types';
import { ProductDetails } from '../modules/shared/types/product.types';
import { Injectable } from '@angular/core';
import { ProductService } from './products.service';
import { ShoppingCart } from '../modules/shared/types/shopping-cart.types';
import { Observable, combineLatest, map, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  subscription: any;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  products: Observable<ProductDetails[]> | undefined;

  fromProductDetailToCartItem(productDetail: ProductDetails): CartItem {
    return {
      id: productDetail.id,
      quantity: 1,
    };
  }

  getLocalStorage(): CartItem[] {
    let cartString = localStorage.getItem('cart');
    if (cartString) return JSON.parse(cartString);
    else return [];
  }

  getShoppingCartItems(): Observable<ShoppingCart[]> {
    const cartItems: CartItem[] = this.getLocalStorage();
    console.log(cartItems);
    return combineLatest(
      cartItems.map((cartItem) =>
        this.productService.getProductDetailsById(cartItem.id)
      )
    ).pipe(
      map((productDetailsList: ProductDetails[]) => {
        return productDetailsList.map((productDetails, index) => {
          return {
            category: productDetails.productCategoryDto.categoryName,
            productName: productDetails.name,
            price: productDetails.price,
            quantity: cartItems[index].quantity,
          };
        });
      })
    );
  }

  addToCart(productDetail: ProductDetails) {
    let cartString = localStorage.getItem('cart');
    let cart = [];
    let currentCartItem: CartItem =
      this.fromProductDetailToCartItem(productDetail);
    if (cartString) {
      cart = JSON.parse(cartString);
      let item = cart.find((o: any) => o.id === currentCartItem.id);
      if (item) {
        item.quantity += 1;
        cart.splice(
          cart.findIndex((o: any) => o.id === currentCartItem.id),
          1
        );
        cart.push(item);
      } else {
        cart.push(currentCartItem);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      cart.push(currentCartItem);
      console.log(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // --> bonus implementation :)
  //
  // deleteFromCart(productDetail: ProductDetails): void {
  //   let cartString = localStorage.getItem('cart');
  //   let cart = [];
  //   let currentCartItem: CartItem =
  //     this.fromProductDetailToCartItem(productDetail);
  //   if (cartString) {
  //     cart = JSON.parse(cartString);
  //     let item = cart.find((o: any) => o.id === currentCartItem.id);
  //     if (item) {
  //       cart[
  //         cart.findIndex((o: any) => o.id === currentCartItem.id)
  //       ].quantity -= 1;
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     }
  //   }
  // }

  // TO DO: Delete from shopping cart
  // deleteFromCart(shoppingCartItem: ShoppingCart): void {
  //   shoppingCartItems: ShoppingCart[] = this.getShoppingCartItems();

  //   shoppingCartItem.findItem((o: any) => o.productName == shoppingCartItem.productName )
  //   let cartString = localStorage.getItem('cart');
  //   let cart = [];
  //   let currentCartItem: CartItem =
  //     this.fromProductDetailToCartItem(productDetail);
  //   if (cartString) {
  //     cart = JSON.parse(cartString);
  //     let item = cart.find((o: any) => o.id === currentCartItem.id);
  //     if (item) {
  //       cart[
  //         cart.findIndex((o: any) => o.id === currentCartItem.id)
  //       ].quantity -= 1;
  //       localStorage.setItem('cart', JSON.stringify(cart));
  //     }
  //   }
  // }

  deleteProductFromList(productDetail: ProductDetails) {
    let cartString = localStorage.getItem('cart');
    let cart = [];
    let currentCartItem: CartItem =
      this.fromProductDetailToCartItem(productDetail);
    if (cartString) {
      cart = JSON.parse(cartString);
      let item = cart.find((o: any) => o.id === currentCartItem.id);
      if (item) {
        cart.splice(
          cart.findIndex((o: any) => o.id === currentCartItem.id),
          1
        );
        localStorage.setItem('cart', JSON.stringify(cart));
      }

      console.log(currentCartItem.id);
      this.subscription = this.productService
        .deleteProduct(currentCartItem.id)
        .subscribe(
          () => {
            this.router.navigate(['/product']);
          },
          (error: any) => {
            console.error('Error deleting product:', error);
          }
        );
    }
  }
}
