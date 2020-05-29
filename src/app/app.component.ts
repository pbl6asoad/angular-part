import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { log, authorize, unauthorize } from './store/actions/users.actions';
import { getIsAuth} from './store/reducers/users.reducers'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  token: string
  login: string
  isAuthorized: boolean
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>) {
    this.store.pipe(select(getIsAuth)).subscribe(vl => {
      this.isAuthorized = vl
    })
  }
  ngOnInit(): void {
    if ( localStorage.getItem('jwtToken') )  {
      this.login = localStorage.getItem('login')
      this.token = localStorage.getItem('jwtToken')
      this.store.dispatch(authorize({token: this.token, login: this.login}));
    }
  }
}
