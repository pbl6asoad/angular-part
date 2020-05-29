import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { authorize, unauthorize } from '../store/actions/users.actions';
import { getIsAuth} from '../store/reducers/users.reducers'
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {  
  configUrl: string = 'http://localhost:5000/post/';
  posts
  createPost() {
    this.router.navigate(['/post/create']);
  }
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>, private http: HttpClient, private router: Router) { }
  
  ngOnInit() {
    return this.http.get(this.configUrl).subscribe((data) => {
      console.log(data);
      this.posts = data
    });
  }

}
