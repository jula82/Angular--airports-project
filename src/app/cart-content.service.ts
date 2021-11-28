import { Injectable } from '@angular/core';
import { ReservationDetails } from './shared/models/reservationDetails.model';

@Injectable({
  providedIn: 'root'
})
export class CartContentService {
  private cartList : ReservationDetails[]= [];

  constructor() {}
  
  getCart() {
    return this.cartList;
  }

  addToCart(reservation: ReservationDetails) {
    this.cartList.push(reservation);
    localStorage.setItem("cartList", JSON.stringify(this.cartList));

  }

  deleteFromCart(reservationId: number) {
    this.cartList.splice(reservationId, 1);
    localStorage.setItem("cartList", JSON.stringify(this.cartList));
  }

  handleCartItems() {
    const cart: ReservationDetails[]
    = JSON.parse(<string>localStorage.getItem('cartList'));

    if (!cart) {
      return;
    } else {
      this.cartList = cart;
    }
  }

}
