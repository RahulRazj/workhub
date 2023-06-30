import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoading = false;
  isLoginMode = true;
  isSignupSuccess = false;
  error = null;

  constructor(private authService: AuthService, private router: Router) {}

  onHandleError() {
    this.error = null;
  }

  onSwitchMode(form: NgForm) {
    form.reset();
    this.isLoginMode = !this.isLoginMode;
  }

  onSignupSuccess() {
    this.isLoginMode = true;
  }

  onSubmit(form: NgForm) {
    const { username, email, password } = form.value;
    if (this.isLoginMode) {
      this.isLoading = true;

      this.authService.login(username, password).subscribe(
        (res) => {
          localStorage.setItem('userDetails', JSON.stringify(res.result));
          this.router.navigate(['/']);
        },
        (errorRes) => {
          this.error =
            errorRes?.error?.errorMessages?.at(0) || 'Internal Server Error';
          this.isLoading = false;
        }
      );
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.authService.signup(username, email, password).subscribe(
      (_) => {
        this.isLoading = false;
        this.isSignupSuccess = true;
      },
      (errorRes) => {
        this.error =
          errorRes?.error?.errorMessages?.at(0) || 'Internal Server Error';
        this.isLoading = false;
      }
    );
  }
}
