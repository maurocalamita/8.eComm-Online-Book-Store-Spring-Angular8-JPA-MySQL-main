import { Component, OnInit } from '@angular/core';
import { FeedBack } from '../model/feedback';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from '../service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;
  feedback: { feedbackType: string; feedbackmsg: string } = { feedbackType: '', feedbackmsg: '' };
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  login(): void {
    this.httpClientService.login(this.userForm.value).subscribe({
      next: (response) => {
        this.feedback = {
          feedbackType: 'success',
          feedbackmsg: 'Welcome: ' + response.name
        };
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['/'])
        .then(() => {
            window.location.reload();
        });
      },
      error: (error) => {
        this.feedback = {
          feedbackType: 'error',
          feedbackmsg: 'Login failed. Please check your credentials.'
        };
        console.log(error);
      }
    });
  }
}
