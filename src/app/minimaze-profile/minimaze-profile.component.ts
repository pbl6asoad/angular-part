import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { unauthorize } from '../store/actions/users.actions';
import { getIsAuth} from '../store/reducers/users.reducers'
import { Router } from '@angular/router';
@Component({
  selector: 'app-minimaze-profile',
  templateUrl: './minimaze-profile.component.html',
  styleUrls: ['./minimaze-profile.component.css']
})
export class MinimazeProfileComponent implements OnInit {
  @Output() hello = new EventEmitter()
  @Input() hi: string
  name = localStorage.getItem('login')
  isAuthorized: boolean 
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>, private http: HttpClient, private router: Router) {
    this.store.pipe(select(getIsAuth)).subscribe(vl => {
      this.isAuthorized = vl
    })
  }

  unauthorize() {
    this.store.dispatch(unauthorize());
    localStorage.clear()
    this.name = ''
    this.router.navigate(['/'])
  }
  ngOnInit(): void {
    this.hello.emit("hello")
    console.log(this.hi)
  }

}
