import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userName: string = null;
  isLoggedIn: boolean = false;
  admin: boolean = false

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    console.log(user)
    if (user && user.name) {
      this.userName = user.name;
      if(user.type == "ADM"){
        this.admin = true;
      }
      this.isLoggedIn = true;
    } else {
      this.userName = 'Guest';
      this.isLoggedIn = false;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userName = 'Guest';
    this.isLoggedIn = false;
    window.location.reload();
  }
}