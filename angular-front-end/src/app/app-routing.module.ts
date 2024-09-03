import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './admin/users/users.component';
import { BooksComponent } from './admin/books/books.component';
import { ShopbookComponent } from './shopbook/shopbook.component';
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { UserGuard } from './user.guard';
import { BookGuard } from './book.guard';
import { BooksMarkComponent } from './marketing/books-edit-discount/books.edit.component';
import { ShowBookComponent } from './marketing/books-edit-discount/show.details.component';



const routes: Routes = [
  { path: 'admin/users', component: UsersComponent ,canActivate: [UserGuard] },
  { path: 'admin/books', component: BooksComponent,canActivate: [BookGuard] },
  { path: 'shop', component: ShopbookComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login' , component: LoginComponent},
  { path: 'mark/books' , component: BooksMarkComponent},
  { path: 'mark/books/details' , component: ShowBookComponent},
  { path: '', redirectTo: 'shop', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
