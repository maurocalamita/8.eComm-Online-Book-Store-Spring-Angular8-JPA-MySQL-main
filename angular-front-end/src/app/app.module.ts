import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { UsersComponent } from './admin/users/users.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdduserComponent } from './admin/users/adduser/adduser.component';
import { ViewuserComponent } from './admin/users/viewuser/viewuser.component';
import { BooksComponent } from './admin/books/books.component';
import { AddbookComponent } from './admin/books/addbook/addbook.component';
import { ViewbookComponent } from './admin/books/viewbook/viewbook.component';
import { ShopbookComponent } from './shopbook/shopbook.component';
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { GlobalHttpInterceptorService } from './error/global.interceptor';
import { HttpClientService } from './service/http-client.service';
import { BooksMarkComponent } from './marketing/books-edit-discount/books.edit.component';
import { ShowBookComponent } from './marketing/books-edit-discount/show.details.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    UsersComponent,
    AdduserComponent,
    ViewuserComponent,
    BooksComponent,
    AddbookComponent,
    ViewbookComponent,
    ShopbookComponent,
    ErrorComponent,
    CartComponent,
    LoginComponent,
    BooksMarkComponent,
    ShowBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptorService, multi: true  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
