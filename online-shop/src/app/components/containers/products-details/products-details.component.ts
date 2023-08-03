import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from 'src/app/modules/shared/types/product.types';
import { ProductsListComponent } from '../products-list/products-list.component';
import { ProductService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent {
  productDetails?: ProductDetails;
  id!: string | null;
  private subscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.subscription = this.productService
        .getProductDetailsById(this.id)
        .subscribe(
          (data) => {
            this.productDetails = data;
          },
          (error) => {
            console.error(error);
          }
        );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
