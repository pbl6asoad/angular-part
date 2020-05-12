import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  login: string;
  password: string;
  constructor(private http: HttpClient) {}
  configUrl = 'http://localhost:5000/users/login';

  loginReq() {
    const body = {
      login: this.login,
      password: this.password,
      token: localStorage.getItem('jwtToken')
    };
    console.log(body);
    return this.http.post(this.configUrl, body).subscribe((data) => {
      if(data['isOk']) {
        console.log(data);
        if(!localStorage.getItem('jwtToken')) {
          localStorage.setItem('jwtToken', data['token'])
          localStorage.setItem('login', data['login']);
        }
      } else {
        console.log("Authorization wasn't passed");
      }
    });
  }
  ngOnInit(): void {}
}
