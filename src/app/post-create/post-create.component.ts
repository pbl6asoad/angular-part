import { Component, OnInit } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { getLogin } from '../store/reducers/users.reducers'
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  title: string
  describtion: string
  photo
  author: string
  serverUrl: string = 'http://localhost:5000/post/create'
  constructor(private store: Store<{ isAuthorized: boolean, token: string }>, private http: HttpClient, private router: Router) {
    this.store.pipe(select(getLogin)).subscribe(vl => {
      this.author = vl
    })
    
  }
  onFileChanged(event) {
    this.photo = event.target.files[0]
  }
  sendPost() {
    const post = {
      photo: this.photo,
      author: this.author,
      title: this.title,
      describtion: this.describtion
    }
    console.log(post);
    this.http.post(this.serverUrl, post).subscribe((data)=> console.log(data))
  }
  ngOnInit(): void {
  }

}
