import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth/auth.service';
import { CartContentService } from './cart-content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';


  ngOnInit(){

  }
  
  constructor(private authService: AuthService, private cartContentService: CartContentService, public router: Router) {
    this.authService.autoLogin();
    this.cartContentService.handleCartItems();
  }

}
