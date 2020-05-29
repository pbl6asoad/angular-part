import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { authorize, unauthorize } from '../store/actions/users.actions';
import { getIsAuth} from '../store/reducers/users.reducers'
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  token: string
  login: string
  password: string;
  result: Object
  disabledBtn: boolean = false
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>, private http: HttpClient, private router: Router) {
    this.store.pipe(select(getIsAuth)).subscribe(vl => console.log(vl))
  }
  disableBtn(){
    if ( this.login.length > 3 && !this.result && this.password ) {
      this.disabledBtn = true
    }
    else this.disabledBtn = false
  }
  configUrl = 'http://localhost:5000/users/signup';
  isDisabledBtn() {
    this.disableBtn()
  }
  search(){
    return this.http.get(this.configUrl + '/' + this.login).subscribe((data) => {
      this.result = data
      console.log(data);
      if ( data === false ) {
        this.disableBtn()
      } else {
        this.disabledBtn = false
      }
    });
    
    
  }
  log(){
    console.log(this.store);
    // this.store.dispatch(log());
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
      // console.log(data);
      this.store.dispatch(authorize({token: data['token'], login: data['login']}));
      this.router.navigate(['/']);
    });
  }
  ngOnInit(): void {
    if ( localStorage.getItem('jwtToken') )  {
      this.login = localStorage.getItem('login')
      this.token = localStorage.getItem('jwtToken')
      this.store.dispatch(authorize({token: this.token, login: this.login}));
    }
  }
}
