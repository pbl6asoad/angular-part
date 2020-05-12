import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  login: string;
  password: string;
  constructor(private http: HttpClient) {}
  configUrl = 'http://localhost:5000/users/signup';

  getJWT() {
    const body = {
      login: this.login,
      password: this.password,
    };
    console.log(body);
    return this.http.post(this.configUrl, body).subscribe((data) => {
      localStorage.setItem('jwtToken', data['token']);
      localStorage.setItem('login', data['login']);
      console.log(data);
    });
  }
  ngOnInit(): void {}
}
