import { Component, OnInit } from '@angular/core';

interface user {
  accessToken: string;
  user: {
    username: string;
    email: string;
    role: string;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userDetails!: user;
  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
  }
}
