import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../model/User ';
import { Book } from '../model/Book';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { }

  getUsers()
  {
    console.log("test call");
    return this.httpClient.get<User[]>('http://localhost:8080/users/get');
  }

  addUser(newUser: User) {
    return this.httpClient.post<User>('http://localhost:8080/users/add', newUser);   
  }

  deleteUser(id) {
    return this.httpClient.delete<User>('http://localhost:8080/users/' + id);
  }

  getBooks(params:any) {
    return this.httpClient.get<Book[]>('http://localhost:8080/books/get', {params});
  }

  addBook(newBook: Book) {
    return this.httpClient.post<Book>('http://localhost:8080/books/add', newBook);
  }

  deleteBook(id) {
    return this.httpClient.delete<Book>('http://localhost:8080/books/' + id);
  }

  updateBook(updatedBook: Book) {
    return this.httpClient.put<Book>('http://localhost:8080/books/update', updatedBook);
  }

  searchProducts(searchTerm: string): Observable<Book[]> {
    // Eseguire la richiesta HTTP GET con i parametri di query
    return this.httpClient.get<Book[]>(`http://localhost:8080/books/search?query=${searchTerm}`)
     
  }

  addBookUser(orderId:number, bookId: number, quantity: string, price: string) {
    const headers = { 'Content-Type': 'application/json' };
    let params = new HttpParams()
    
    .set('orderId', orderId.toString())
    .set('price', price)
    .set('bookId', bookId.toString())
    .set('quantity', quantity)
    
    return this.httpClient.post<any>(`http://localhost:8080/order-books/add`, {}, { headers , params });
  }
  

  getType(): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://localhost:8080/type/get`);
  }

  putUser(id: number, userDetails: any): Observable<any> {
    return this.httpClient.put<any>(`http://localhost:8080/users/update/${id}`, userDetails);
}

getBooks1() {
  return this.httpClient.get<Book[]>('http://localhost:8080/books/get');
}

login(user: User): Observable<User>{
  return this.httpClient.post<User>(`http://localhost:8080/users/login`, user, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
}

getIdOrder(userId: number) : Observable <any> {
    return this.httpClient.get<any>(`http://localhost:8080/orders/${userId}`);

}
createOrder(name: string)  : Observable <any> {
  const headers = { 'Content-Type': 'application/json' };
  let params = new HttpParams().set('name', name);

  return this.httpClient.post<any>(`http://localhost:8080/orders/add-order`,{},{ headers , params });
}

}
