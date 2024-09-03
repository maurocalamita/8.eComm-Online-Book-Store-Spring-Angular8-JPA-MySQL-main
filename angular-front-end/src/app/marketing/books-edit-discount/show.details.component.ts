import { Component, OnInit,Input,EventEmitter, Output } from '@angular/core';
import { Book } from 'src/app/model/Book';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.details.component.html',
  
})
export class ShowBookComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  bookDeletedEvent = new EventEmitter();


  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

  ngOnInit() {
  }


  editBook() {
    this.router.navigate(['mark', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
  }

}
