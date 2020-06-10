import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { authorize, unauthorize } from '../store/actions/users.actions';
import { getIsAuth } from '../store/reducers/users.reducers';
import { Router } from '@angular/router';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  configUrl: string = 'http://localhost:5000/post/';
  posts;
  currentPage: number = 1
  pages: number;
  onBin: boolean = false
  postsPerPage: number = 1
  pagePosts = []
  createPost() {
    this.router.navigate(['/post/create']);
  }
  
  constructor(
    private store: Store<{ isAuthorized: boolean; token: string }>,
    private http: HttpClient,
    private router: Router
  ) {}
  change(e) {    
    this.posts[ e - 1].change = true
    console.log(this.posts[ e - 1]);
  }
  save(e){
    console.log(e);
    this.posts[ e - 1].change = false
    const post = this.posts[e-1]
    return this.http.put(this.configUrl + 'update/' + post.id, post).subscribe((data) => {
      console.log(data);
    });
  }
  mouseEnter(id){
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].id === id){
        console.log(this.posts[i].title);
        this.posts[i].isRed = 'red'
      }
    }
  }
  mouseLeave(id){
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].id === id){
        this.posts[i].isRed = ''
      }
    }
  }
  delete(id){
    for(let i = 0; i < this.posts.length; i++){
      if(this.posts[i].id === id){
        delete this.posts[i]
        console.log(this.posts);
      }
    }
    return this.http.delete(this.configUrl + 'delete/' + id).subscribe((data) => {});
  }
  getPosts(){
    // for ( let i = 1; i < this.postsPerPage + 1; i++) {
    //  if(this.posts[i * this.currentPage - 1] === undefined) break;
    //  this.pagePosts.push(this.posts[i * this.currentPage - 1]);
    // }
    this.pagePosts = []
    for(let i = this.postsPerPage * this.currentPage - this.postsPerPage + 1; i <  this.postsPerPage * this.currentPage + 1 ; i++){
      
      if( i > this.posts.length ) break;
      this.pagePosts.push(this.posts[i-1])
    }

    this.pages = Math.ceil((Object.keys(this.posts).length - 1) / this.postsPerPage )
    if(this.pages < this.currentPage) {
      this.currentPage = this.pages
      this.getPosts()
    }
  }
  ngOnInit() {
    return this.http.get(this.configUrl).subscribe((data) => {
      console.log(data);
      this.posts = data;
      this.pages = Math.ceil(Object.keys(data).length / this.postsPerPage)
      this.posts.isRed = ''
      this.getPosts()
      
    });
  }
}
