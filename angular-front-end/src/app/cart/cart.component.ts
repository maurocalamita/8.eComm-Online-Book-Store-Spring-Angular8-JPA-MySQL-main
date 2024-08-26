import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedBack } from '../model/feedback';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cartBooks: { id: number, name: string, price: number, quantity: number, retrievedImage: string }[] = [];
  feedback = new FeedBack("", "");
  paymentInProgress: boolean;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartBooks = JSON.parse(data);
    }
  }

  updateCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartBooks));
  }

  removeFromCart(bookId: number) {
    this.cartBooks = this.cartBooks.filter(item => item.id !== bookId);
    this.updateCartData();
  }

  getTotalPrice(): number {
    return this.cartBooks.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  proceedToCheckout() {
    // Logica per il checkout o navigazione a una pagina di pagamento
    this.paymentInProgress = true;
    this.feedback = {
        feedbackType: "success",
        feedbackmsg: "Payment successful!",
      };
    console.log('Proceeding to checkout...');
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }

  emptyCart() {
    this.cartBooks = [];
    this.updateCartData();
  }
}
