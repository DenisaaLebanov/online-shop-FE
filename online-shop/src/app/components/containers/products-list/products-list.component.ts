import { Component } from '@angular/core';
import { getAllProductsDetailsMock } from 'src/app/mocks/products.mocks';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent {
  products = getAllProductsDetailsMock(5);
}
