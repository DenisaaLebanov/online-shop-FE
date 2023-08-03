import { Injectable } from '@angular/core';
import { CartItem } from '../modules/shared/types/cart.types';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ProductDetails } from '../modules/shared/types/product.types';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products!: ProductDetails[];

  constructor(private http: HttpClient) {}

  public getProductDetailsById(productId: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>(
      `${environment.apiUrl}/product/${productId}`
    );
  }

  public getAllProducts(): Observable<ProductDetails[]> {
    if (this.products) {
      return of(this.products);
    }
    let products = this.http.get<ProductDetails[]>(
      `${environment.apiUrl}/product`
    );
    return products.pipe(tap((p) => (this.products = p)));
  }

  public deleteProduct(productId: string): Observable<any> {
    this.products.splice(this.products.findIndex((o) => o.id == productId));
    const url = `${environment.apiUrl}/product/${productId}`;
    return this.http.delete(url);
  }
}
