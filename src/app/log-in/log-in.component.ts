import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { authorize, unauthorize } from '../store/actions/users.actions';
import { getIsAuth} from '../store/reducers/users.reducers'
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  login: string;
  password: string;
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>, private http: HttpClient, private router: Router) {
    this.store.pipe(select(getIsAuth)).subscribe(vl => console.log(vl))
  }
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
          this.store.dispatch(authorize({token: data['token'], login: data['login']}));
          this.router.navigate(['/']);
        }
      } else {
        console.log("Authorization wasn't passed");
      }
    });
  }
  ngOnInit(): void {}
}
