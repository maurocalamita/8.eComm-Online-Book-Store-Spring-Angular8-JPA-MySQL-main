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

  isEditing = false;


  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

  ngOnInit() {
    this.checkDiscountValidity();
    setInterval(() => this.checkDiscountValidity(), 60 * 1000); // Controllo ogni minuto
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveChanges();
    }
    this.router.navigate(['mark', 'books'], { queryParams: { action: 'edit', id: this.book.id } });
  }

  saveChanges() {
    this.httpClientService.updateBook(this.book).subscribe(
      response => {
        console.log('Libro aggiornato nel database:', response);
      },
      error => {
        console.error('Errore durante l\'aggiornamento del libro:', error);
      }
    );
  }

  //Timer
  checkDiscountValidity() {
    const currentDate = new Date();
    const endDate = new Date(this.book.dataFine!);

    if (currentDate > endDate && this.book.discount > 0) {
      this.book.discount = 0;
      this.book.dataInizio = null;
      this.book.dataFine = null;
      this.saveChanges(); // Aggiorna il libro nel database rimuovendo lo sconto
    }
  }

}
