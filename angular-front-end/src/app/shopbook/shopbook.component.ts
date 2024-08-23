import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Book } from '../model/Book';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  quantityForm: FormGroup;

  cartBooks: { id: number, name: string, price: number, quantity: number, retrievedImage: string }[] = [];

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private fb: FormBuilder
  ) {
    this.quantityForm = this.fb.group({
      quantity: [1] // Imposta il valore predefinito a 1
    });
  }

  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    this.loadCart();
  }

  loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartBooks = JSON.parse(data);
    }
  }

  handleSuccessfulResponse(response) {
    this.books = response.map(book => ({
      ...book,
      retrievedImage: 'data:image/jpeg;base64,' + book.picByte
    }));
  }

  addToCart(bookId: number) {
    const book = this.books.find(book => book.id === bookId);
    if (book) {
      const quantity = this.quantityForm.get('quantity').value;

      const existingItem = this.cartBooks.find(item => item.id === book.id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartBooks.push({
          id: book.id,
          name: book.name,
          price: book.price,
          quantity: quantity,
          retrievedImage: book.retrievedImage
        });
      }

      this.updateCartData();
      this.quantityForm.reset({ quantity: 1 });
      book.isAdded = true;
    }
  }

  updateCartData() {
    localStorage.setItem('cart', JSON.stringify(this.cartBooks));
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartBooks = [];
    this.updateCartData();
  }

  removeFromCart(bookId: number) {
    this.cartBooks = this.cartBooks.filter(item => item.id !== bookId);
    this.updateCartData();
  }

  getTotalPrice(): number {
    return this.cartBooks.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}
