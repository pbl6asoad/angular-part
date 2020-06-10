import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { getLogin } from '../store/reducers/users.reducers';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  title: string;
  description: string;
  photo;
  author: string;
  serverUrl: string = 'http://localhost:5000/post/create';
  constructor(
    private store: Store<{ isAuthorized: boolean; token: string }>,
    private http: HttpClient,
    private router: Router,
    private form: FormBuilder
  ) {
    this.store.pipe(select(getLogin)).subscribe((vl) => {
      this.author = vl;
    });
  }
  onFileChanged(event) {
    this.photo = event.target.files[0];
  }
  sendPost() {
    const post = {
      img: this.photo,
      author: this.author,
      title: this.title,
      description: this.description
    }
    this.http
      .post(this.serverUrl, post)
      .subscribe((data) => console.log(data));
      
    this.router.navigate(['/posts'])
  }
  ngOnInit(): void {}
}
