import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductDetails } from 'src/app/modules/shared/types/product.types';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: Observable<ProductDetails[]> | undefined;
  error: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.products = this.productService.getAllProducts();
  }
}
