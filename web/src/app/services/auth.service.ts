import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SignupResponseData {
  message: string;
  status: number;
  code: number;
}

interface loginResponseData {
  statusCode: number;
  isSuccess: boolean;
  errorMessages: string;
  result: Object;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private apiUrl = 'http://localhost:3035/user';
  private apiUrl = 'https://localhost:7287/api/auth';
  constructor(private http: HttpClient) {}

  signup(
    username: string,
    email: string,
    password: string
  ): Observable<SignupResponseData> {
    const signupUrl = `${this.apiUrl}/signup`;
    return this.http.post<SignupResponseData>(signupUrl, {
      username,
      email,
      password,
      role: 'admin',
    });
  }

  login(email: string, password: string): Observable<loginResponseData> {
    const loginUrl = `${this.apiUrl}/login`;
    return this.http.post<loginResponseData>(loginUrl, { email, password });
  }
}
