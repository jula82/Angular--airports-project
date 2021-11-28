import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth/auth.service';
import { CartContentService } from '../cart-content.service';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private subUser: Subscription;
  private email: string = '';
  constructor(
    private cartContent: CartContentService, 
    private authService: AuthService,
    private flightsService: FlightsService) { 
      this.subUser = this.authService.user$.subscribe(user => {
        this.isAuthenticated = !user ? false : true;
        if (this.isAuthenticated) {
          this.email = user!.email;
        }
        this.sendAuthStatus(this.isAuthenticated);
      });
    }


  ngOnInit(): void {
  }

  getCartAmount() {
    return this.cartContent.getCart().length;
  }

  ngOnDestroy() {
    this.subUser.unsubscribe();
  }

  sendAuthStatus(status: boolean) {
    this.flightsService.sendAuthenticationStatus(status);
  }
  
  onLogout() {
    this.authService.logOut();
    this.isAuthenticated = false;
    this.flightsService.sendAuthenticationStatus(false);
  }

}
