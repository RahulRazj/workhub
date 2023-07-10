import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  username!: null
  constructor(private router: Router) {}


  ngOnInit(): void {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.username = userDetails.user.username
  }

  onLogout() {
    localStorage.removeItem('userDetails');
    this.router.navigate(['auth']);
  }
}
