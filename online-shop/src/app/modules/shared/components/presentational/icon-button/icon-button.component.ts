import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartModule } from '../../../../shopping-cart/shopping-cart.module';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, ShoppingCartModule],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @Input() iconType?: string;

  @Output()
  public myOutput = new EventEmitter<MouseEvent>();

  public handleClick(event: MouseEvent) {
    this.myOutput.emit(event);
  }
}
