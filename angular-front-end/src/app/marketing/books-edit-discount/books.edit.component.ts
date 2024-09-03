import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-books',
  templateUrl: './books.edit.component.html',
  
})
export class BooksMarkComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  action: string;
  selectedBook: Book;

  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.books = [];
    this.httpClientService.getBooks1().subscribe({
      next: (response: any) => {
        const data = response;
        if (data.books && data.books.length !== 0) {
          this.books = data.books.map(book => ({
            ...book,
            retrievedImage: 'data:image/jpeg;base64,' + book.picByte
          }));
          
        } else {
          this.books = [];
          
        }
      },
      error: (err: any) => {
        console.log('Error during fetching books:', err);
      },
      complete: () => {
        console.log('Fetch books complete');
      }
    });
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
        // get the parameter id. this will be the id of the book whose details 
        // are to be displayed when action is view.
        const id = params['id'];
        // if id exists, convert it to integer and then retrive the book from
        // the books array
        if (id) {
          this.selectedBook = this.books.find(book => {
            return book.id === +id;
          });
        }
      }
    );
  }

  // we will be taking the books response returned from the database
  // and we will be adding the retrieved   
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    //get books returned by the api call
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      //populate retrieved image field so that book image can be displayed
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  viewBook(id: number) {
    this.router.navigate(['mark/books'], { queryParams: { id, action: 'view' } });
  }

}
