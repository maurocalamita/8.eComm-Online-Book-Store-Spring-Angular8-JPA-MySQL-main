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
  admin: boolean = false;
  marketing: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    const user = JSON.parse(storedUser);
    console.log(user)
    if (user && user.name) {
      this.userName = user.name;
      if(user.type == "ADM"){
        this.admin = true;
        this.marketing = false;
      }
      if(user.type == "MRK"){
        this.marketing = true;
        this.admin = false;
      }
      this.isLoggedIn = true;
    } else {
      this.userName = 'Guest';
      this.isLoggedIn = false;
      this.admin = false;
      this.marketing = false;
    }
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userName = 'Guest';
    this.isLoggedIn = false;
    window.location.reload();
  }
}