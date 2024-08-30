import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/model/User ';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { Type } from 'src/app/model/type';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  userProfiles: Type[] = [];

  @Input()
  user: User;

  @Output()
  userDeletedEvent = new EventEmitter();

  isEditing: boolean = false; // Variabile di stato per la modalità di modifica
  isPasswordVisible: boolean = false;

  constructor(private httpClientService: HttpClientService,
              private router: Router) { }

  ngOnInit() {
     // Ottieni i tipi e inizializza il modulo
     this.httpClientService.getType().subscribe(data => {
      this.userProfiles = data;
    });
  }

  deleteUser() {
    this.httpClientService.deleteUser(this.user.id).subscribe(
      () => {
        this.userDeletedEvent.emit();
        this.router.navigate(['admin', 'users']);
      }
    );
  }

  toggleEdit() {
    this.isEditing = !this.isEditing; // Attiva/disattiva la modalità di modifica
  }

  updateUser() {
    this.httpClientService.putUser(this.user.id, this.user).subscribe(
      (updatedUser) => {
        console.log('User updated successfully:', updatedUser);
        this.isEditing = false; // Torna alla modalità di visualizzazione dopo l'aggiornamento
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }

  isValid(): boolean {
    // Valida i campi necessari
    return this.user.name && this.user.name.length >= 2 &&
           this.user.type && this.user.password.length >= 6;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  get passwordType(): string {
    return this.isPasswordVisible ? 'text' : 'password';
  }
}
