import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/User ';
import { HttpClientService } from 'src/app/service/http-client.service';
import { Router } from '@angular/router';
import { Type } from 'src/app/model/type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  userProfiles: Type[] = [];
  ngForm: FormGroup;
  hidePassword: boolean = true; 

  @Input()
  user: User;

  @Output()
  userAddedEvent = new EventEmitter<void>();

  constructor(private httpClientService: HttpClientService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit() {
    // Ottieni i tipi e inizializza il modulo
    this.httpClientService.getType().subscribe(data => {
      this.userProfiles = data;
    });

    this.ngForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      type: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    });
  }

  addUser() {
    if (this.ngForm.valid) {
      const userData = this.ngForm.value;  // Ottieni i dati dal modulo

      this.httpClientService.addUser(userData).subscribe(
        () => {
          this.userAddedEvent.emit();
          this.router.navigate(['admin', 'users']);
        },
        error => {
          // Gestisci l'errore qui
          console.error('Errore durante l\'aggiunta dell\'utente:', error);
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword; // Alterna tra mostrare e nascondere la password
  }

  get name() {
    return this.ngForm.get('name');
  }

  get password() {
    return this.ngForm.get('password');
  }

  get type() {
    return this.ngForm.get('type');
  }
}
