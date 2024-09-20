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
  userOrders: any[] = []; // Variabile per memorizzare gli ordini dell'utente
  userId: string = null;

  constructor(private router: Router, private httpClientService: HttpClientService) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    
    const user = JSON.parse(localStorage.getItem('user'));
    this.userId = user.id;

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
  if (!this.isAuthenticated()) {
    // Se l'utente non è autenticato, reindirizzalo alla pagina di login con il parametro returnUrl
    this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
    return;
  }
  this.httpClientService.createOrder(this.userId).subscribe({
    next: (order: any) => {
      const orderId = order.id;
      this.bookUserOrder(orderId);
      this.paymentInProgress = true;
      // Clear localStorage and navigate after 3 seconds
      setTimeout(() => {
        localStorage.removeItem('cart');
        this.router.navigate(['/']);
      }, 3000);
    },
    error: (err: any) => {
      console.error('Error occurred:', err);
      this.feedback = {
        feedbackType: "error",
        feedbackmsg: "An error occurred during the checkout process.",
      };
    }
  })

  // Se l'utente è autenticato, procedi con il checkout
  
  this.feedback = {
    feedbackType: 'success',
    feedbackmsg: 'Payment successful!',
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

  bookUserOrder(orderId:any) {
    this.cartBooks.forEach((cartItem: any) => {
      this.httpClientService.addBookUser(orderId.toString(), cartItem.id.toString(), cartItem.quantity.toString(), cartItem.price.toString()).subscribe({
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
        complete: () => {}
      });
    });
  }
  

  isAuthenticated(): boolean {
    const user = localStorage.getItem('user');
    return !!user; // Restituisce true se l'utente è loggato (oggetto presente), altrimenti false
  }

  // Metodo per ottenere gli ordini dell'utente
  loadUserOrders(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userId = user.id || 1; // Supponendo che userId sia presente in localStorage o impostato staticamente

    this.httpClientService.getIdOrder(userId).subscribe({
      next: (orders) => {
        this.userOrders = orders;
        console.log('User Orders:', this.userOrders); // Puoi usare gli ordini come desideri
      },
      error: (error) => {
        console.error('Error retrieving user orders:', error);
      }
    });
  }
}
