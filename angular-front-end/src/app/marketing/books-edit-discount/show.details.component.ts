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
  today: string;
  minEndDate: string;


  constructor(private httpClientService: HttpClientService, private router: Router
    ) { }

  ngOnInit() {
    this.setToday();
    this.updateMinEndDate();
    this.checkDiscountValidity();
    setInterval(() => this.checkDiscountValidity(), 60 * 1000); // Controllo ogni minuto
   
  }

  setToday() {
    const now = new Date();
    this.today = this.formatDate(now); // Formattazione per 'datetime-local'
  }

  // Formatta una data nel formato 'yyyy-MM-ddTHH:mm' per compatibilità con 'datetime-local'
  formatDate(date: Date): string {
    // Ottieni la data in formato UTC
    const utcDate = new Date(date.toISOString());
    // Converti UTC in ora locale
    const localDate = new Date(utcDate.getTime() - (utcDate.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 16);
  }

  // Quando l'utente cambia la data di inizio, aggiorna la data minima per la fine
  updateMinEndDate() {
    if (this.book.dataInizio) {
      const dataInizio = new Date(this.book.dataInizio);
      this.minEndDate = this.formatDate(dataInizio); // Imposta data di inizio come minimo per la fine
    } else {
      this.minEndDate = this.today; // Se non c'è data di inizio, usa la data corrente
    }
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
