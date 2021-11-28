import { Component, OnInit } from '@angular/core';
import { CartContentService } from '../cart-content.service';
import { DateParseService } from '../date-parse.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartContent: CartContentService, private parseDate: DateParseService) { }

  ngOnInit(): void {
  }

  getCartContent(){
    return this.cartContent.getCart();
  }

  getParsedDate(date: Date) {
    return this.parseDate.getFullDateFromDateType(date);;
  }

  deleteFromCart(id: number) {
    this.cartContent.deleteFromCart(id);
  }

}
