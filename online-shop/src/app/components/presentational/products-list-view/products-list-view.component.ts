import { Component, Input, OnInit } from '@angular/core';
import { ProductDetails } from 'src/app/types/product.types';

@Component({
  selector: 'app-products-list-view',
  templateUrl: './products-list-view.component.html',
  styleUrls: ['./products-list-view.component.scss'],
})
export class ProductsListViewComponent /*implements OnInit*/ {
  @Input() products?: ProductDetails[];

  // ngOnInit(): void {
  //   debugger;
  // }

  displayedColumns: string[] = ['name', 'price', 'description', 'category'];
}
