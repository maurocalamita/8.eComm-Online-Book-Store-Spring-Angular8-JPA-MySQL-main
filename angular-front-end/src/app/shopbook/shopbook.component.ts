import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';
import { Book } from '../model/Book';
import { FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import { FeedBack } from '../model/feedback';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  quantityForm: FormGroup;
  myForm: FormGroup;
  searchTerm: string;
  feedback = new FeedBack("", "");
  totalBooks: number = 0;
  pagination: number = 0;
  productPage: number = 4;
  sortField: string = "name"
  sortOrder: string = 'desc';
  cartBooks: { id: number, name: string, price: number, quantity: number, retrievedImage: string }[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private fb: FormBuilder
  ) {
    this.quantityForm = this.fb.group({
      quantity: [1] // Imposta il valore predefinito a 1
    });

    this.myForm = this.fb.group({
      searchTerm: ['', Validators.required]
    });
  }

  ngOnInit() {
   
    this.getAllBooks();

    this.loadCart();
  }

  getAllBooks() {
    this.isLoading = true;
    let params = new HttpParams()
      .set('page', String(this.pagination))
      .set('size', String(this.productPage))
      .set('sort', this.sortField)
      .set('order', this.sortOrder);

    this.httpClientService.getBooks(params).subscribe({
      next: (response: any) => {
        const data = response;
        if (data.books && data.books.length !== 0) {
          this.books = data.books.map(book => ({
            ...book,
            retrievedImage: 'data:image/jpeg;base64,' + book.picByte
          }));
          this.totalBooks = data.totalItems;
        } else {
          this.books = [];
          this.totalBooks = 0;
        }
      },
      error: (err: any) => {
        console.log('Error during fetching books:', err);
      },
      complete: () => {
        console.log('Fetch books complete');
      }
    });
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

  onSearch() {
    this.isLoading = false;
    const searchTerm = this.myForm.get('searchTerm').value;
   
      this.httpClientService.searchProducts(searchTerm).subscribe({
        next: (data: Book[]) => {
          this.books = data.map(book => ({
            ...book,
            retrievedImage: 'data:image/jpeg;base64,' + book.picByte
          }));
        },
        error: (err: any) => {
          console.log('Error during search:', err);
        },
        complete: () => {
          console.log('Search complete');
        },
      });
    
  }

  onReset() {
    this.isLoading = true;
    // Resetta il campo di ricerca nel form
    this.myForm.reset();
  
    // Reimposta il termine di ricerca (opzionale)
    this.searchTerm = '';
  
    // Ricarica tutti i libri
   this.getAllBooks();
  }
  
  renderPage(event: number) {
    this.pagination = event - 1;
    this.getAllBooks();
}
  
}
