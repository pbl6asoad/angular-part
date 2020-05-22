import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { log } from '../store/actions/users.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  login: string;
  password: string;
  count$: Observable<string>
  constructor(private store: Store<{ count: string }>, private http: HttpClient) {
    this.count$ = store.pipe(select('count'));
  }
  configUrl = 'http://localhost:5000/users/signup';
  log(){
    this.store.dispatch(log());
  }
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
