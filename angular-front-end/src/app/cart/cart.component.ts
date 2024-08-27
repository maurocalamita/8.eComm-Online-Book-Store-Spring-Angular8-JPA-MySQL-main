import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedBack } from '../model/feedback';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cartBooks: { id: number, name: string, price: number, quantity: number, retrievedImage: string }[] = [];
  feedback = new FeedBack("", "");
  paymentInProgress: boolean;

  constructor(private router: Router, private httpClientService: HttpClientService) {}

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
    this.bookUserOrder();
    this.paymentInProgress = true;
    this.feedback = {
        feedbackType: "success",
        feedbackmsg: "Payment successful!",
      };
    console.log('Proceeding to checkout...');
    //this.router.navigate(['/add-book-user']);
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }

  emptyCart() {
    this.cartBooks = [];
    this.updateCartData();
  }

  bookUserOrder(){
    let userId = 1;
    this.cartBooks.forEach((cartItem: any) => {
      /*let params = new HttpParams;
    
      params = params.append('quantity', cartItem.quantity.toString());
      params = params.append('userId', ""+userId);
      params = params.append('bookId', cartItem.id.toString());*/

      this.httpClientService.addBookUser(userId, cartItem.id.toString(), cartItem.quantity.toString()).subscribe({
          next: (data: any) => {
              console.log('Order book added successfully');
          },
          error: (err: any) => {
              console.error('Error occurred:', err);
              this.feedback = {
                  feedbackType: err.feedbackType,
                  feedbackmsg: err.feedbackmsg,
              };
          },
          complete: () => {
          },
      });
  });
  }
}
